import { ComplianceBalance } from "../domain/ComplianceBalance";

export class ComputeComplianceBalance {
  constructor(private readonly targetIntensity: number) {}

  execute(actualIntensity: number, energyInScope: number): ComplianceBalance {
    const cb = (this.targetIntensity - actualIntensity) * energyInScope;
    return { shipId: "default", year: new Date().getFullYear(), cb_gCO2e: cb };
  }
}
