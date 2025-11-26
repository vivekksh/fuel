export type ComplianceBalance = {
  shipId: string;
  year: number;
  cb_gCO2e: number;
};

export const calculateComplianceBalance = (
  targetIntensity: number,
  actualIntensity: number,
  energyInScope: number
): number => {
  return (targetIntensity - actualIntensity) * energyInScope;
};
