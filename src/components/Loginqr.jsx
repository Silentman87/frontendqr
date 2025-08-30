import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import {Link } from 'react-router-dom';

import { QRCodeCanvas } from 'qrcode.react';

const Loginqr = () => {
  const [qrLink, setQrLink] = useState('');
  const [qrCode, setQrCode] = useState('#000000');
  const [qremail, setQrEmail] = useState('choudharyshravan300@gmail.com');
  const qrRef = useRef();

  // Save QR
  const SaveQr = async () => {
    const utoken = localStorage.getItem('utoken');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testuser/addlinkqr`,
        { qrlink: qrLink, qrcolor: qrCode },
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${utoken}` } }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Send QR to Email
  const SendQr = async () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return console.error("Canvas not found");

    try {
      const imageBase64 = canvas.toDataURL('image/png');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/testuser/sendemail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: qremail, img: imageBase64, sub: "Your QR Code" }),
      });
      const data = await response.json();
      console.log("Email sent response:", data);
    } catch (err) {
      console.error("Error sending QR email:", err);
    }
  };

  // Download QR
  const DownloadQr = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return console.error("Canvas not found");
    try {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      a.click();
    } catch (err) {
      console.error("Failed to export QR code:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Helmet>
        <title>Login QR Page</title>
      </Helmet>

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">QR Dashboard</h1>
          <nav className="space-x-4">
            <Link to="/dashboard" className="hover:text-amber-300">Dashboard</Link>
            <Link to="/login" className="hover:text-amber-300">Logout</Link>
         
          </nav>
        </div>
      </header>

      {/* Centered Card */}
      <main className="flex flex-1 justify-center items-center">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px]">
          <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">
            Generate Your QR Code
          </h2>

          {/* Inputs */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your link"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => setQrLink(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter email to send QR"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => setQrEmail(e.target.value)}
            />
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-600">Choose Color</label>
              <input
                type="color"
                value={qrCode}
                className="w-16 h-10 border rounded"
                onChange={(e) => setQrCode(e.target.value)}
              />
            </div>
          </div>

          {/* QR Preview */}
          <div
            ref={qrRef}
            className="flex justify-center mt-6 p-4 bg-gray-100 rounded-xl shadow-inner"
          >
            <QRCodeCanvas value={qrLink} fgColor={qrCode} size={200} includeMargin={true} />
          </div>

          {/* Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={SaveQr}
              className="py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            >
              Save to Storage
            </button>
            <button
              onClick={DownloadQr}
              className="py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Download
            </button>
          </div>

          <button
            onClick={SendQr}
            className="mt-4 w-full py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
          >
            Send to Email
          </button>
        </div>
      </main>
    </div>
  );
};

export default Loginqr;

