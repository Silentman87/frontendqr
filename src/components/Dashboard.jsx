import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
      console.error("Dashboard fetch failed:", err);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 text-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <Navbar />

      {/* 💡 Hero Section */}
      <section className="relative text-center py-20 px-4">
        <div className="relative z-10">
          <div className="inline-block animate-bounce mb-6"> 
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-transparent bg-clip-text animate-pulse">
            Build, Style & Track Your QR Codes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Powerful, real-time QR Code platform with modern UI, analytics, and lightning-fast generation.
          </p>
          <a
            href="/loginqr"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-800 to-gray-600 text-white text-lg px-8 py-4 rounded-full font-bold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="group-hover:animate-spin">🚀</span>
            Generate QR Now
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

       {/* Statistics Overview */}
<section className="py-12">
 <div className="max-w-6xl mx-auto px-6">
   <h2 className="text-2xl font-semibold text-gray-800 mb-8">Overview</h2>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
       <h3 className="text-3xl font-bold text-gray-800 mb-1">
         {stateOverview?.users?.total ?? 0}
       </h3>
       <p className="text-sm text-gray-500">Total Users</p>
     </div>
     
     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
       <h3 className="text-3xl font-bold text-gray-800 mb-1">
         {stateOverview?.users?.active ?? 0}
       </h3>
       <p className="text-sm text-gray-500">Active Users</p>
     </div>
     
     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
       <h3 className="text-3xl font-bold text-gray-800 mb-1">
         {stateOverview?.users?.inactive ?? 0}
       </h3>
       <p className="text-sm text-gray-500">Inactive Users</p>
     </div>
     
     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
       <h3 className="text-3xl font-bold text-gray-800 mb-1">
         {stateOverview?.qrCodes?.totalGenerated ?? 0}
       </h3>
       <p className="text-sm text-gray-500">QR Codes Created</p>
     </div>
   </div>
 </div>
</section>

      {/* 🕒 Recent Activity */}
      <section className="relative bg-gradient-to-r from-gray-50 to-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-12 text-center bg-gradient-to-r from-gray-700 to-gray-900 text-transparent bg-clip-text">
            Recent Activity
          </h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-6">
              {recentActivity.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-purple-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold text-lg mb-2 group-hover:text-gray-900">
                        {item.message}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 opacity-50">
                
              </div>
              <p className="text-xl text-gray-500 font-medium">No recent activity yet.</p>
              <p className="text-gray-400 mt-2">Activity will appear here as users interact with your platform.</p>
            </div>
          )}
        </div>
      </section>

      {/* 🧾 Footer */}
      <footer className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-12 mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-sm">
              Q
            </div>
            <span className="text-2xl font-bold">QRCode Hero</span>
          </div>
          <p className="text-gray-300 mb-4">
            © {new Date().getFullYear()} QRCode Hero. Crafted with ❤️ by your team.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
