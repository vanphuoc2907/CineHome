import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import { menus } from '../../../utils/Constants';
import { CiCalculator1 } from "react-icons/ci";
import { FaUserAstronaut } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiProfileLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
function MenuAdmin(props) {
    const [index, setIndex] = useState(null);
    const [show,setShow] = useState(false);
    const handleIndex = (id) => {
        if (id == index) {
            setIndex(null)
        } else {
            setIndex(id)
        }
    }
    return (
        <div className='md:h-[100vh] bg-slate-400  px-5'>
            <div className='flex items-center py-5 font-bold'> <IoMdMenu onClick={() => setShow(!show)} className='mr-2 text-lg font-bold' /> {show && <><span>CINEHOME</span><span className='text-red-600'>ADMIN</span></>  } </div>
            <div className={show ? "" : "max-md:hidden"}>
            <Link to={"/"} className='flex items-center gap-2 p-2 mb-2 bg-red-300 hover:bg-red-500 hover:text-white rounded-md'><MdOutlineDashboard /> {show && <span>Dashboard</span>  }  </Link>
              {show && <h1 className='px-2'>UI ELEMENTS</h1> }  
            <Link to={"/categories"} className='flex items-center gap-2 p-2 bg-red-300 hover:bg-red-500 hover:text-white rounded-md'><CiCalculator1 />{show && <span>Categories</span> }  </Link>
              {show && <h1 className='py-2'>FORMS AND DATAS</h1> } 
            {
                menus.map((element, i) => (
                    <div className='mt-2'>
                        <li onClick={() => handleIndex(element.id)} className='flex items-center gap-2 p-2 bg-red-300 hover:bg-red-500 hover:text-white rounded-md'>{element.icon}{show &&  <span>{element.title}</span>} {element.id == index ? <FaCaretDown className='ml-auto' /> : <FaCaretRight className='ml-auto' />}   </li>
                        <div className={`flex flex-col ${index == element.id ? "" : "hidden"}`}>
                            {element.items.map(a => (
                                <Link to={a.path} className='p-2 bg-red-200 mt-1 rounded-md hover:bg-red-400'>{a.title}</Link>
                            ))}
                        </div>

                    </div>
                ))
            }
           {show && <h1 className='py-2'>PAGES</h1> } 
          <Link to={"/userpages"}>  <li className='flex my-2 items-center gap-2 p-2 bg-red-300 hover:bg-red-500 hover:text-white rounded-md'><FaUserAstronaut /> {show && <span>User Pages</span> }</li> </Link>
            </div>
        </div>
    );
}

export default MenuAdmin;