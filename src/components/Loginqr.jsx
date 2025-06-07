import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import axios  from 'axios';

import {QRCodeCanvas} from 'qrcode.react';

const Loginqr = () => {
  const [qrLink, setQrLink] = useState('');
  const [qrCode, setQrCode] = useState('#000000');
  const [qremail, setQrEmail] = useState('choudharyshravan300@gmail.com')
 const qrRef = useRef();


const SaveQr = async() => {
  const utoken = localStorage.getItem('utoken');

  try {
    const responce =  await axios.post("http://localhost:5000/testuser/addlinkqr",{
        qrlink:qrLink,
        qrcolor:qrCode
    },
    {
       headers:{
         'Content-Type':'application/json',
         Authorization:`Bearer ${utoken}`
       }
  })
    console.log(responce.data)
  } catch (error) {
     console.log(error)
  }

}

const SendQr = async() => {
   const canvas = qrRef.current?.querySelector('canvas');
  if (!canvas) {
    console.error("Canvas not found");
    return;
  }
  try {
    const imageBase64 = canvas.toDataURL('image/png');
   const responce = await fetch('http://localhost:5000/testuser/sendemail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: qremail,  // email string in quotes
      img: imageBase64,  // img url string in quotes
      sub: "Your QR Code",
    }),
  });
     const data = await response.json();
    console.log("Email sent response:", data);
  } catch (err) {
    console.error("Error sending QR email:", err);
  }
};



const DownloadQr = () => {
  const canvas = qrRef.current?.querySelector('canvas');
  if (!canvas) {
    console.error('Canvas not found');
    return;
  }

  try {
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  } catch (err) {
    console.error('Failed to export QR code:', err);
  }
};
  return (
    <div className='flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100'>
      <Helmet>
        <title className='text-2xl font-bold mb-4'>Login QR Page</title>
      </Helmet>

       <h2 className="text-3xl font-bold mb-6 text-black shadow-md uppercase">
    Generate Qr for your url
</h2>



         <input                                                                        
             type="text"                 
             placeholder='type your link here'                                    
             className='mb-4 p-2 w-80 border rounded'
              onChange={(e)=>setQrLink(e.target.value)} />
      
           <input  type="email" 
               placeholder='enter email to send qr'
              className='mb-4 p-2 w-80 border rounded '  onChange={(e) => setQrEmail(e.target.value)}
            />
          <input
          type="color"
             className='mb-4 p-2 border ' value={qrCode}
                onChange={(e)=>setQrCode(e.target.value)}
            />
      

      <div ref={qrRef} className='p-2 rounded-lg shadow-lg bg-blue-200'>
      <QRCodeCanvas
       value={qrLink}
        fgColor={qrCode} 
        size='200' includeMargin='true' >
        </QRCodeCanvas>
        </div>


       <div>
        <button className='mt-4 py-2 px-2 mr-2 bg-amber-500 hover:bg-green-400 text-white transition' onClick={SaveQr}>
         SaveQr to storage
      </button>

      <button className='mt-4 py-2 px-2   bg-blue-500  hover:bg-amber-200 text-white transition' onClick={DownloadQr}>
         Download 
      </button>
     
       </div>
       <button className='mt-4 py-2 px-4 w-60  bg-green-500 hover:bg-blue-400 text-white transition' onClick={SendQr}>
         Send to mail
      </button>





    </div>
  );
};

export default Loginqr;
