import React, { useContext, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { ContextAuth } from '../../../context/AuthProvider';
function HeaderAdmin(props) {
    const [show,setShow] = useState(false);
    const { logout } = useContext(ContextAuth);
    return (
        <div className='flex items-center justify-between p-3'>
            <div>
                <p className='text-3xl font-semibold text-gray-400'>Hello Admin, <span className='font-bold text-black'> Phuoc</span> </p>
                <p className='font-semibold text-gray-400'>Your performance summary this week</p>
            </div>

            <div className='flex items-center text-lg gap-5 relative' >
                 <FaSearch /><MdEmail /><FaBell />
                  <img onClick={() => setShow(!show)} className='w-10 h-10 rounded-full' src="data:image/jpeg;base64,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" alt="" />
                 {
                    show &&  <div className='absolute top-[45px] right-0 bg-red-300 p-2 rounded-md z-10'>
                    <li className='p-1 border-b border-white'>Phuoc123@gmail.com</li>
                    <li className='p-1 hover:bg-red-500 hover:text-white flex items-center gap-3'><CgProfile /> Profile</li>
                    <li onClick={logout} className='p-1 hover:bg-red-500 hover:text-white flex items-center gap-3'><IoLogOutOutline /> Logout</li>
                </div>
                 }
                 
                 
            </div>

        </div>
    );
}

export default HeaderAdmin;