import React, { useEffect, useState } from "react";
import axios from "axios";

type Pool = {
  id: string;
  year: number;
  members: Array<{ shipId: string; cb_before: number; cb_after: number }>;
};

type PoolMemberInput = {
  shipId: string;
  cb: number;
};

const PoolingTab: React.FC = () => {
  const [year, setYear] = useState<number>(2024);
  const [members, setMembers] = useState<PoolMemberInput[]>([
    { shipId: "", cb: 0 },
  ]);
  const [pools, setPools] = useState<Pool[]>([]);

  const fetchPools = () => {
    axios.get("http://localhost:3001/api/pools").then((res) => {
      setPools(res.data);
    });
  };

  const handleAddMember = () => {
    setMembers([...members, { shipId: "", cb: 0 }]);
  };

  const handleMemberChange = (index: number, field: string, value: string | number) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handleCreatePool = () => {
    axios
      .post("http://localhost:3001/api/pools", { year, members })
      .then((res) => {
        alert("Pool created successfully!");
        fetchPools();
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Failed to create pool");
      });
  };

  useEffect(() => {
    fetchPools();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pooling</h2>
      <div className="mb-4">
        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border p-2"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Pool Members</h3>
          {members.map((member, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                placeholder="Ship ID"
                value={member.shipId}
                onChange={(e) => handleMemberChange(index, "shipId", e.target.value)}
                className="border p-2"
              />
              <input
                type="number"
                placeholder="CB (gCO2e)"
                value={member.cb}
                onChange={(e) => handleMemberChange(index, "cb", Number(e.target.value))}
                className="border p-2"
              />
            </div>
          ))}
          <div className="flex space-x-4">
            <button
              onClick={handleAddMember}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Add Member
            </button>
            <button
              onClick={handleCreatePool}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create Pool
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <h3 className="text-lg font-bold mb-2">Existing Pools</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Pool ID</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Members</th>
            </tr>
          </thead>
          <tbody>
            {pools.map((pool) => (
              <tr key={pool.id}>
                <td className="py-2 px-4 border-b">{pool.id}</td>
                <td className="py-2 px-4 border-b">{pool.year}</td>
                <td className="py-2 px-4 border-b">
                  <ul>
                    {pool.members.map((member, index) => (
                      <li key={index}>
                        {member.shipId} (Before: {member.cb_before}, After: {member.cb_after})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoolingTab;
