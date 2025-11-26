import React, { useState } from "react";
import RoutesTab from "./adapters/ui/RoutesTab";
import CompareTab from "./adapters/ui/CompareTab";
import BankingTab from "./adapters/ui/BankingTab";
import PoolingTab from "./adapters/ui/PoolingTab";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("routes");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FuelEU Compliance Dashboard</h1>
      <div className="mb-4 flex space-x-2">
        <button
          className={`px-4 py-2 rounded ${activeTab === "routes" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("routes")}
        >
          Routes
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "compare" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("compare")}
        >
          Compare
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "banking" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("banking")}
        >
          Banking
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "pooling" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("pooling")}
        >
          Pooling
        </button>
      </div>
      {activeTab === "routes" && <RoutesTab />}
      {activeTab === "compare" && <CompareTab />}
      {activeTab === "banking" && <BankingTab />}
      {activeTab === "pooling" && <PoolingTab />}
    </div>
  );
};

export default App;
