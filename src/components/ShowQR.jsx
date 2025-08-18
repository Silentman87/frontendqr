import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const ShowQR = () => {
  const [qrs, setQrs] = useState([]);

  useEffect(() => {
    const fetchQRs = async () => {
      try {
        const token = localStorage.getItem('utoken');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/testuser/getqrlink`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQrs(res.data);
      } catch (err) {
        console.error('Error fetching QR codes:', err);
      }
    };

    fetchQRs();
     // 🔄 Keep fetching every 5 seconds
  const interval = setInterval(fetchQRs, 5000);

  // cleanup when component unmounts
  return () => clearInterval(interval);
  
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">QR Dashboard</h1>
          <div>
    
          </div>
        </div>
      </nav>

      {/* QR Code Table */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Your QR Codes</h2>

        {qrs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No QR codes found.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-orange-100 text-gray-700 font-semibold text-sm">
                <tr>
                  <th className="px-6 py-3">S.No.</th>
                  <th className="px-6 py-3">QR Code</th>
                  <th className="px-6 py-3">QR Link</th>
                  <th className="px-6 py-3">Color</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {qrs.map((qr, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <QRCodeCanvas value={qr.qrlink} size={64} fgColor={qr.qrcolor || '#000000'} />
                    </td>
                    <td className="px-6 py-4 text-blue-600 break-all">
                      <a href={qr.qrlink} target="_blank" rel="noopener noreferrer">
                        {qr.qrlink}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-block w-6 h-6 rounded-full border"
                        style={{ backgroundColor: qr.qrcolor || '#000000' }}
                      ></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowQR;
