import React, { useContext, useState } from 'react';
import { logo } from '../../utils/Constants';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp, IoEyeSharp } from "react-icons/io5";
import { linkMenu } from '../../utils/Constants';
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiBoxList, CiHeart } from "react-icons/ci";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ContextAuth } from '../../context/AuthProvider';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import { FiSearch } from 'react-icons/fi';
import { ContextMovies } from '../../context/MovieProvider';
import { handleClick } from '../../services/playMovie';
import { ContextPlans } from '../../context/PlanProvider';
function HeaderClient({ handleOpenLogin, }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const { accountLogin, logout } = useContext(ContextAuth);
    const [showSearch, setShowSearch] = useState(false);
    const movies = useContext(ContextMovies);
    const plans = useContext(ContextPlans);
      const navigate = useNavigate();
    return (
        <div className='fixed top-0 left-0 w-full z-20 bg-black/40 backdrop-blur-none '>
            <div className='flex text-white p-3 justify-between items-center relative h-[70px]'>
                <div className='lg:hidden' onClick={() => setShowMenu(!showMenu)} >
                    {showMenu ? <IoCloseSharp /> : <AiOutlineMenu />}
                </div>

                <img className='w-16 h-10' src={logo} alt="" />
                <ul className={`flex max-lg:flex-col lg:gap-3 max-lg:absolute top-[70px] max-lg:bg-black left-0 max-lg:w-full ${showMenu ? "" : "max-lg:hidden"}`}>
                    {
                        linkMenu.map((element, index) => (
                            <Link key={index} to={element.path} className='p-2 text-center lg:hover:text-red-700 transition-all duration-500 max-lg:border-b border-white max-lg:hover:bg-white max-lg:hover:text-black'>{element.title}</Link>
                        ))
                    }

                </ul>
                {accountLogin ? <div className='flex gap-3 items-center'>
                    <Link to={"/plan"}><button className='bg-yellow-500 rounded-lg p-1'>Đăng ký gói</button></Link>
                    {showSearch ? <Stack
                        spacing={2}
                        sx={{
                            width: showSearch ? 300 : 0,
                            overflow: 'hidden',
                            transition: 'width 1s ease-in-out',
                        }}
                    >
                        <Autocomplete
                            id="free-solo-demo"
                            size="small"
                            freeSolo
                            options={movies}
                            getOptionLabel={(option) => option.name || ""} // tránh lỗi JSON
                            renderOption={(props, option) => (
                                <li className='bg-black' {...props}>
                                    <div onClick={() => handleClick(option,accountLogin,plans,navigate)}  className='flex mt-3 gap-3 border-b pb-3'>
                                        <div className='w-20 h-20'>
                                            <img src={option.imgUrl} alt="" />
                                        </div>
                                        <div className='flex-1'>
                                            <h1 className='text-1xl font-semibold'>{option.name}</h1>
                                            <p className='flex items-center gap-3'>
                                                <CiHeart /> 3.000 <IoEyeSharp /> 3.000
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search movie..."
                                    InputProps={{
                                        ...params.InputProps,
                                        style: {
                                          backgroundColor: "#000", // 👈 nền đen
                                          color: "#fff", // 👈 chữ trắng
                                        },
                                        endAdornment: (
                                            <>
                                                {params.InputProps.endAdornment}
                                                <FiSearch
                                                    onClick={() => setShowSearch(false)}
                                                    style={{ marginLeft: 8, color: "#888", cursor: 'pointer' }}
                                                />
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Stack> : <FaSearch onClick={() => setShowSearch(true)} />}

                    <div className='flex relative items-center'>
                        <img className='w-8 h-8 rounded-full' src={accountLogin?.imgUrl ? accountLogin?.imgUrl : "https://gockienthuc.edu.vn/wp-content/uploads/2024/07/hinh-anh-avatar-trang-mac-dinh-doc-dao-khong-lao-nhao_6690f00736e94.webp"} alt="" />
                        <div onClick={() => setShowAccount(!showAccount)}>
                            {showAccount ? <MdKeyboardArrowDown className='text-2xl font-semibold' /> : <MdKeyboardArrowRight className='text-2xl font-semibold' />}
                        </div>
                        {showAccount && <div className='absolute z-50 top-[40px] right-0 bg-white text-black p-2 rounded-lg'>
                            <div className='flex items-center flex-col gap-3 p-2 '>
                                <img className='w-10 h-10 rounded-full' src={accountLogin?.imgUrl ? accountLogin?.imgUrl : "https://gockienthuc.edu.vn/wp-content/uploads/2024/07/hinh-anh-avatar-trang-mac-dinh-doc-dao-khong-lao-nhao_6690f00736e94.webp"} alt="" />
                                <div className='font-bold text-sm'>{accountLogin?.email}</div>
                            </div>
                            <Link to={"/library"} className='flex items-center gap-3 p-2 hover:bg-gray-500 hover:text-white '>
                                <li><CiBoxList /></li> <p className='whitespace-nowrap'>Movie Library</p>
                            </Link>
                            <Link to={"/accountpage"} className='flex items-center gap-3 p-2 hover:bg-gray-500 hover:text-white'>
                                <li ><FaRegUser /></li>  <p >Account</p>
                            </Link>
                            <div onClick={logout} className='flex items-center gap-3 p-2 hover:bg-gray-500 hover:text-white '>
                                <li><RiLogoutCircleRLine /></li>  <p >Logout</p>
                            </div>
                        </div>}
                    </div>
                </div> : <button onClick={handleOpenLogin} className='border border-white p-2 rounded-full'>ĐĂNG NHẬP</button>} </div>
        </div>
    );
}

export default HeaderClient;