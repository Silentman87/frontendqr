import React,{useState , useEffect} from 'react';
import axios from 'axios'
import Navbar from './Navbar';

const AllLinkQr = () => {
    const [qrlink,setqrlink] = useState([])
    const [loading,setloading] = useState(true)

    const fetchqrlinks = async() => {
         try {
            const utoken = localStorage.getItem('utoken')
            const responce = await axios.get(`${import.meta.env.VITE_API_URL}/testuser/getqrlink`,
                {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization : `Bearer ${utoken}`
                    }
                });
                setqrlink(responce.data);
                setloading(false);
         } catch (error) {
            console.log(error)
         }
    };

    useEffect(()=>{
        fetchqrlinks();
    },[]);

    if(loading){
       return (
         <div className="flex justify-center items-center h-screen">
           <p className="text-lg font-medium text-gray-700">Loading QR links...</p>
         </div>
       )
    }

  return (
    <>
      <Navbar />
      <div className='max-w-4xl mt-10 mx-auto px-4'>
        {qrlink.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-xl text-gray-500 font-semibold">You have not generated any QR yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className='bg-white shadow-lg rounded-lg w-full border border-gray-300'>
              <thead className='bg-gray-800 text-white'>
                <tr>
                  <th className='py-3 px-6 text-left'>QR Link</th>
                  <th className='py-3 px-6 text-left'>QR Color</th>
                  <th className='py-3 px-6 text-left'>QR Status</th>
                </tr>
              </thead>
              <tbody>
                {qrlink.map((qr, index) => (
                  <tr key={index} className='border-b hover:bg-gray-100'>
                    <td className='py-3 px-6 break-all text-blue-600'>{qr.qrlink}</td>
                    <td className='py-3 px-6 capitalize'>{qr.qrcolor}</td>
                    <td className='py-3 px-6'>{qr.qrstatus || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllLinkQr;
