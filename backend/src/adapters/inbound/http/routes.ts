import express from "express";
import { ComputeComplianceBalance } from "../../../core/application/ComputeComplianceBalance";
import { Route } from "../../../core/domain/Route";

const router = express.Router();
const computeCB = new ComputeComplianceBalance(89.3368);

// Mock database for demonstration
let routes: Route[] = [
  {
    id: "R001",
    vesselType: "Container",
    fuelType: "HFO",
    year: 2024,
    ghgIntensity: 91.0,
    fuelConsumption: 5000,
    distance: 12000,
    totalEmissions: 4500,
    isBaseline: true,
  },
  {
    id: "R002",
    vesselType: "BulkCarrier",
    fuelType: "LNG",
    year: 2024,
    ghgIntensity: 88.0,
    fuelConsumption: 4800,
    distance: 11500,
    totalEmissions: 4200,
    isBaseline: false,
  },
  {
    id: "R003",
    vesselType: "Tanker",
    fuelType: "MGO",
    year: 2024,
    ghgIntensity: 93.5,
    fuelConsumption: 5100,
    distance: 12500,
    totalEmissions: 4700,
    isBaseline: false,
  },
  {
    id: "R004",
    vesselType: "RoRo",
    fuelType: "HFO",
    year: 2025,
    ghgIntensity: 89.2,
    fuelConsumption: 4900,
    distance: 11800,
    totalEmissions: 4300,
    isBaseline: false,
  },
  {
    id: "R005",
    vesselType: "Container",
    fuelType: "LNG",
    year: 2025,
    ghgIntensity: 90.5,
    fuelConsumption: 4950,
    distance: 11900,
    totalEmissions: 4400,
    isBaseline: false,
  },
];

// Mock database for banking records
let bankRecords: Array<{ id: string; shipId: string; year: number; amount_gCO2e: number }> = [];
// Mock database for pools
let pools: Array<{ id: string; year: number; members: Array<{ shipId: string; cb_before: number; cb_after: number }> }> = [];

// Routes Endpoints
router.get("/routes", (req, res) => {
  res.json(routes);
});

router.post("/routes/:id/baseline", (req, res) => {
  const { id } = req.params;
  routes = routes.map((route) => ({
    ...route,
    isBaseline: route.id === id,
  }));
  res.json({ success: true, message: `Route ${id} set as baseline` });
});

router.get("/routes/comparison", (req, res) => {
  const baselineRoute = routes.find((route) => route.isBaseline);
  if (!baselineRoute) {
    return res.status(404).json({ error: "No baseline route set" });
  }

  const comparisonData = routes
    .filter((route) => !route.isBaseline)
    .map((route) => {
      const percentDiff = ((route.ghgIntensity / baselineRoute.ghgIntensity) - 1) * 100;
      const compliant = route.ghgIntensity <= 89.3368;
      return { ...route, percentDiff, compliant };
    });

  res.json(comparisonData);
});

// Compliance Endpoints
router.get("/compliance/cb", (req, res) => {
  const { shipId, year } = req.query;
  const route = routes.find((r) => r.id === shipId && r.year === Number(year));
  if (!route) {
    return res.status(404).json({ error: "Route not found" });
  }

  const energyInScope = route.fuelConsumption * 41000;
  const cb = computeCB.execute(route.ghgIntensity, energyInScope);
  res.json(cb);
});

router.get("/compliance/adjusted-cb", (req, res) => {
  const { shipId, year } = req.query;
  const route = routes.find((r) => r.id === shipId && r.year === Number(year));
  if (!route) {
    return res.status(404).json({ error: "Route not found" });
  }

  const energyInScope = route.fuelConsumption * 41000;
  const cb = computeCB.execute(route.ghgIntensity, energyInScope);
  res.json({ ...cb, adjusted: cb.cb_gCO2e });
});

// Banking Endpoints
router.get("/banking/records", (req, res) => {
  const { shipId, year } = req.query;
  const records = bankRecords.filter((r) => r.shipId === shipId && r.year === Number(year));
  res.json(records);
});

router.post("/banking/bank", (req, res) => {
  const { shipId, year, amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ error: "Amount must be positive" });
  }

  const newRecord = {
    id: `bank-${Date.now()}`,
    shipId,
    year,
    amount_gCO2e: amount,
  };
  bankRecords.push(newRecord);
  res.json({ success: true, record: newRecord });
});

router.post("/banking/apply", (req, res) => {
  const { shipId, year, amount } = req.body;
  const availableRecords = bankRecords.filter((r) => r.shipId === shipId && r.year === Number(year));
  const totalBanked = availableRecords.reduce((sum, record) => sum + record.amount_gCO2e, 0);

  if (amount > totalBanked) {
    return res.status(400).json({ error: "Insufficient banked amount" });
  }

  // Logic to apply banked amount (simplified for demo)
  res.json({ success: true, message: `${amount} gCO2e applied` });
});

// Pooling Endpoints
router.post("/pools", (req, res) => {
  const { year, members } = req.body;
  const totalCB = members.reduce((sum: number, member: { shipId: string; cb: number }) => sum + member.cb, 0);

  if (totalCB < 0) {
    return res.status(400).json({ error: "Sum of CB must be >= 0" });
  }

  // Sort members by CB (descending)
  const sortedMembers = [...members].sort((a, b) => b.cb - a.cb);

  // Allocate surplus to deficits
  const poolMembers = sortedMembers.map((member) => {
    const cbAfter = member.cb >= 0 ? 0 : member.cb;
    return { shipId: member.shipId, cb_before: member.cb, cb_after: cbAfter };
  });

  const newPool = {
    id: `pool-${Date.now()}`,
    year,
    members: poolMembers,
  };
  pools.push(newPool);
  res.json(newPool);
});

router.get("/pools", (req, res) => {
  res.json(pools);
});

export default router;
