import React, { useEffect, useState } from "react";
import axios from "axios";

type BankRecord = {
  id: string;
  shipId: string;
  year: number;
  amount_gCO2e: number;
};

const BankingTab: React.FC = () => {
  const [shipId, setShipId] = useState<string>("");
  const [year, setYear] = useState<number>(2024);
  const [amount, setAmount] = useState<number>(0);
  const [records, setRecords] = useState<BankRecord[]>([]);

  const fetchRecords = () => {
    axios
      .get(`http://localhost:3001/api/banking/records?shipId=${shipId}&year=${year}`)
      .then((res) => {
        setRecords(res.data);
      });
  };

  const handleBank = () => {
    axios
      .post("http://localhost:3001/api/banking/bank", { shipId, year, amount })
      .then((res) => {
        alert(res.data.message);
        fetchRecords();
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Failed to bank CB");
      });
  };

  const handleApply = () => {
    axios
      .post("http://localhost:3001/api/banking/apply", { shipId, year, amount })
      .then((res) => {
        alert(res.data.message);
        fetchRecords();
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Failed to apply banked CB");
      });
  };

  useEffect(() => {
    if (shipId && year) {
      fetchRecords();
    }
  }, [shipId, year]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Banking</h2>
      <div className="mb-4">
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Ship ID"
            value={shipId}
            onChange={(e) => setShipId(e.target.value)}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Amount (gCO2e)"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border p-2"
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleBank}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Bank CB
          </button>
          <button
            onClick={handleApply}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Apply Banked CB
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Record ID</th>
              <th className="py-2 px-4 border-b">Ship ID</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Amount (gCO2e)</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td className="py-2 px-4 border-b">{record.id}</td>
                <td className="py-2 px-4 border-b">{record.shipId}</td>
                <td className="py-2 px-4 border-b">{record.year}</td>
                <td className="py-2 px-4 border-b">{record.amount_gCO2e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankingTab;
