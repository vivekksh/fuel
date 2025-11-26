import React from "react";
import RoutesTab from "./adapters/ui/RoutesTab";

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FuelEU Compliance Dashboard</h1>
      <RoutesTab />
    </div>
  );
};

export default App;
