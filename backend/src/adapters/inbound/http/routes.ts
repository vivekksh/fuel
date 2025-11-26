import express from "express";
import { ComputeComplianceBalance } from "../../../core/application/ComputeComplianceBalance";

const router = express.Router();
const computeCB = new ComputeComplianceBalance(89.3368);

router.get("/compliance/cb", (req, res) => {
  const { shipId, year } = req.query;
  // Mock data for demo
  const actualIntensity = 91.0;
  const energyInScope = 5000 * 41000;
  const cb = computeCB.execute(actualIntensity, energyInScope);
  res.json(cb);
});

router.get("/routes", (req, res) => {
  // Mock data for demo
  const routes = [
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
  ];
  res.json(routes);
});

export default router;
