import React, { useEffect, useState } from "react";
import axios from "axios";

type ComparisonData = {
  id: string;
  vesselType: string;
  fuelType: string;
  ghgIntensity: number;
  percentDiff: number;
  compliant: boolean;
};

const CompareTab: React.FC = () => {
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/routes/comparison").then((res) => {
      setComparisonData(res.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Comparison</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Route ID</th>
              <th className="py-2 px-4 border-b">Vessel Type</th>
              <th className="py-2 px-4 border-b">Fuel Type</th>
              <th className="py-2 px-4 border-b">GHG Intensity</th>
              <th className="py-2 px-4 border-b">% Difference</th>
              <th className="py-2 px-4 border-b">Compliant</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((data) => (
              <tr key={data.id}>
                <td className="py-2 px-4 border-b">{data.id}</td>
                <td className="py-2 px-4 border-b">{data.vesselType}</td>
                <td className="py-2 px-4 border-b">{data.fuelType}</td>
                <td className="py-2 px-4 border-b">{data.ghgIntensity}</td>
                <td className="py-2 px-4 border-b">{data.percentDiff.toFixed(2)}%</td>
                <td className="py-2 px-4 border-b">{data.compliant ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareTab;
