import Navbar from "./Navbar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Dashboard = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [stateOverview, setStateOverview] = useState({});

  const fetchDashboardData = async () => {
    try {
      const res1 = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/recent-activity`);
      const res2 = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/state-overview`);
      setRecentActivity(res1.data);
      setStateOverview(res2.data);
    } catch (err) {
      console.error('Dashboard fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">🎯 QR Generator Dashboard</h1>

        {/* 📌 Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* 📈 State Overview Cards */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">📊 State Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold">{stateOverview?.users?.total ?? 0}</h3>
                <p>Total Users</p>
              </div>
              <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold">{stateOverview?.users?.active ?? 0}</h3>
                <p>Active Users</p>
              </div>
              <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold">{stateOverview?.users?.inactive ?? 0}</h3>
                <p>Inactive Users</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">QR Stats</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg w-full sm:w-1/2 shadow">
                  <h3 className="text-xl font-bold">{stateOverview?.qrCodes?.totalGenerated ?? 0}</h3>
                  <p>Total QR Codes</p>
                </div>
              </div>
            </div>
          </div>

          {/* 🕒 Recent Activity */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">🕒 Recent Activity</h2>
            <ul className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                    <span className="text-blue-500 text-xl">📌</span>
                    <div>
                      <p className="text-gray-700 font-medium">{item.message}</p>
                      <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No recent activity.</p>
              )}
            </ul>
          </div>
        </div>

        {/* ➕ Call to Action */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-xl shadow text-center">
          <h3 className="text-2xl font-bold mb-2">Generate a New QR Code</h3>
          <p className="mb-4">Create, customize, download or email a new QR code in seconds.</p>
          <a href="/loginqr" className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            ➕ Create QR Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
