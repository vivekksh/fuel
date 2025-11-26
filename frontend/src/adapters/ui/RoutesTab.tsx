import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route } from "../../core/domain/Route";

const RoutesTab: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/routes").then((res) => {
      setRoutes(res.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Routes</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Vessel Type</th>
            <th className="py-2 px-4 border-b">Fuel Type</th>
            <th className="py-2 px-4 border-b">GHG Intensity</th>
            <th className="py-2 px-4 border-b">Fuel Consumption</th>
            <th className="py-2 px-4 border-b">Distance</th>
            <th className="py-2 px-4 border-b">Total Emissions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td className="py-2 px-4 border-b">{route.id}</td>
              <td className="py-2 px-4 border-b">{route.vesselType}</td>
              <td className="py-2 px-4 border-b">{route.fuelType}</td>
              <td className="py-2 px-4 border-b">{route.ghgIntensity}</td>
              <td className="py-2 px-4 border-b">{route.fuelConsumption}</td>
              <td className="py-2 px-4 border-b">{route.distance}</td>
              <td className="py-2 px-4 border-b">{route.totalEmissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutesTab;
