import React, { useContext, useState } from 'react';
import { logo } from '../../utils/Constants';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { linkMenu } from '../../utils/Constants';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ContextAuth } from '../../context/AuthProvider';
function HeaderClient({ handleOpenLogin }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const { accountLogin, logout } = useContext(ContextAuth);
    return (
        <div className='flex bg-black text-white p-3 justify-between items-center relative h-[70px]'>
            <div className='lg:hidden' onClick={() => setShowMenu(!showMenu)} >
                {showMenu ? <IoCloseSharp /> : <AiOutlineMenu />}
            </div>

            <img className='w-16 h-10' src={logo} alt="" />
            <ul className={`lg:flex gap-3 max-lg:absolute top-[70px] bg-black left-0 max-lg:w-full ${showMenu ? "" : "max-lg:hidden"}`}>
                {
                    linkMenu.map((element, index) => (
                        <Link key={index} to={element.path} className='p-2 text-center lg:hover:text-red-700 transition-all duration-500 max-lg:border-b border-white max-lg:hover:bg-white max-lg:hover:text-black'>{element.title}</Link>
                    ))
                }

            </ul>
            {accountLogin ? <div className='flex gap-3'>
                <button className='bg-yellow-500 rounded-lg p-1'>Đăng ký gói</button>
                <div className='flex relative items-center'>
                    <img className='w-8 h-8 rounded-full' src="https://gockienthuc.edu.vn/wp-content/uploads/2024/07/hinh-anh-avatar-trang-mac-dinh-doc-dao-khong-lao-nhao_6690f00736e94.webp" alt="" />
                    <div onClick={() => setShowAccount(!showAccount)}>
                        {showAccount ? <MdKeyboardArrowDown className='text-2xl font-semibold' /> : <MdKeyboardArrowRight className='text-2xl font-semibold' />}
                    </div>
                    {showAccount && <div className='absolute z-50 top-[40px] right-0 bg-white text-black p-2 rounded-lg'>
                        <div className='flex items-center flex-col gap-3 p-2 '>
                            <img className='w-10 h-10 rounded-full' src="https://gockienthuc.edu.vn/wp-content/uploads/2024/07/hinh-anh-avatar-trang-mac-dinh-doc-dao-khong-lao-nhao_6690f00736e94.webp" alt="" />
                            <div className='font-bold text-sm'>{accountLogin?.email}</div>
                        </div>
                        <div className='flex items-center gap-3 p-2 hover:bg-gray-500 hover:text-white '>
                            <li><CiBoxList /></li> <p className='whitespace-nowrap'>Movie Library</p>
                        </div>
                        <div className='flex items-center gap-3 p-2 hover:bg-gray-500 hover:text-white'>
                            <li ><FaRegUser /></li>  <p >Account</p>
                        </div>
                        <div onClick={logout} className='flex items-center gap-3 p-2 hover:bg-gray-500 hover:text-white '>
                            <li><RiLogoutCircleRLine /></li>  <p >Logout</p>
                        </div>
                    </div>}
                </div>
            </div> : <button onClick={handleOpenLogin} className='border border-white p-2 rounded-full'>DANG NHAP</button>} </div>
    );
}

export default HeaderClient;