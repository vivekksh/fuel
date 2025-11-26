// backend/src/__tests__/ComputeComplianceBalance.test.ts
import { ComputeComplianceBalance } from "../core/application/ComputeComplianceBalance";

describe("ComputeComplianceBalance", () => {
  it("should calculate compliance balance correctly", () => {
    const computeCB = new ComputeComplianceBalance(89.3368);
    const actualIntensity = 91.0;
    const energyInScope = 5000 * 41000;
    const result = computeCB.execute(actualIntensity, energyInScope);
    expect(result.cb_gCO2e).toBeCloseTo((89.3368 - 91.0) * energyInScope);
  });
});
