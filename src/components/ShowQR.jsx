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
  }, []);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Your QR Codes</h2>
      {qrs.length === 0 ? (
        <p>No QR codes found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {qrs.map((qr, index) => (
            <div key={index} className='p-4 border rounded shadow text-center'>
              <QRCodeCanvas value={qr.qrlink} size={150} fgColor={qr.qrcolor || "#000000"} />
              <p className='mt-2 break-words text-sm'>{qr.qrlink}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowQR;
