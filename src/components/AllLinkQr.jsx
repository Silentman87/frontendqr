import React,{useState , useEffect} from 'react';
import axios from 'axios'
import Navbar from './Navbar';


const AllLinkQr = () => {
    const [qrlink,setqrlink] = useState([])
    const [loading,setloading] = useState(true)

    const fetchqrlinks = async() => {
         try {
            const utoken = localStorage.getItem('utoken')
            const responce = await axios.get("http://localhost:5000/testuser/getqrlink",
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
       return <p>Loading Qr link </p>
    }
  return (

    <>
  
    <div className='mx-w-4xl mt-10  mx-auto'>
       
        <table className='bg-white shadow-md rounded-lg min-w-full overflow-hidden border border-gray-200'>
           <thead className='bg-gray-800 text-white'>   <tr>
              <th className='py-3 px-6 text-left'>Qr links</th>
              <th className='py-3 px-6 text-left'>qr color</th>
              <th className='py-3 px-6 text-left'>qr status </th>
        </tr>

        </thead>
          <tbody>
            {qrlink.map((qr, index) => (
          <tr key={index} className='border-b hover:bg-gray-200'>
        <td className='py-3 px-6'>{qr.qrlink}</td>
        <td className='py-3 px-6'>{qr.qrcolor}</td>
        <td className='py-3 px-6'>{qr.qrstatus || 'N/A'}</td> {/* if qrstatus not set in backend */}
      </tr>
       ))}

            </tbody>    
            
            </table>
    </div>
    </>
  );
};

export default AllLinkQr;
