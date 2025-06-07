import Navbar from "./Navbar";
import React from 'react';
const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🎯 QR Generator Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-gray-500 text-sm">QRs Generated</h2>
          <p className="text-2xl font-semibold text-blue-600 mt-2">56</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-gray-500 text-sm">Downloads</h2>
          <p className="text-2xl font-semibold text-green-600 mt-2">112</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-gray-500 text-sm">Emails Sent</h2>
          <p className="text-2xl font-semibold text-purple-600 mt-2">34</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-gray-500 text-sm">Saved QRs</h2>
          <p className="text-2xl font-semibold text-red-500 mt-2">18</p>
        </div>
      </div>

      {/* Recent QR Activity */}
      <div className="bg-white rounded-lg shadow p-6 mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">🕓 Recent QR Activity</h3>
        <ul className="text-gray-600 space-y-3">
          <li>✅ Generated QR for <strong>https://myportfolio.com</strong></li>
          <li>📥 Downloaded QR for <strong>GitHub Profile</strong></li>
          <li>✉️ Sent QR to <strong>john@example.com</strong></li>
          <li>🖊️ Edited QR color to <strong>#FF0000</strong></li>
        </ul>
      </div>

      {/* Call to Action */}
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