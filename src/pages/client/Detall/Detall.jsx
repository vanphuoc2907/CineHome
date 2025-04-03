import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { IoLogoPlaystation } from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { ContextMovies } from '../../../context/MovieProvider';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieRent, getObjectById, truncate2 } from '../../../utils/FunctionContants';
import { ContextActors } from '../../../context/ActorProvider';
import { ContextAuthors } from '../../../context/AuthorProvider';
import { ContextCharacters } from '../../../context/CharacterProvider';
import { ContextCategories } from '../../../context/CategoryProvider';
import { ContextPlans } from '../../../context/PlanProvider';
function Detall(props) {
    const movies = useContext(ContextMovies);
    const authors = useContext(ContextAuthors);
    const actors = useContext(ContextActors);
    const characters = useContext(ContextCharacters);
    const categories = useContext(ContextCategories);
    const plans = useContext(ContextPlans);
    const [movieDetail, setMovieDetail] = useState({});
    const { id } = useParams();
    useEffect(() => {
        setMovieDetail(getObjectById(id, movies));
    }, [id, movies]);
    return (
        <div className='p-20'>
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2"  >
                    <div className='detail-movie' style={{ backgroundImage: `url(${movieDetail?.imgUrl})` }}>
                        <div className="grid grid-cols-4 gap-3 p-10 py-20 bg-black/40 backdrop-blur-none "  >
                            <div className="col-span-1">
                                <img className='object-cover h-[300px] rounded-lg' src={movieDetail?.imgUrl} alt="" />
                            </div>
                            <div className="col-span-3 text-white">
                                <h1 className='text-2xl font-semibold text-green-700'>{movieDetail?.name}</h1>
                                <p>{movieDetail?.description}</p>
                                <hr className='mt-20' />
                                <div className='mt-5 flex gap-3'>
                                    <div className='text-white'>
                                        <div className='text-yellow-400 flex'>
                                            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                                        </div>
                                        <p>Đánh giá 98/10 từ 1189 thành viên </p>
                                    </div>
                                    <div className='flex justify-evenly flex-1  self-end'>
                                        <li className='flex items-center gap-3'><IoTimeSharp /> 24/24</li>
                                        <li className='flex items-center gap-3'><BsCalendar2Date /> 2024</li>
                                        <li className='flex items-center gap-3'><IoEyeSharp /> 3.000.000 Lượt xem</li>
                                    </div>
                                </div>
                                <div className='mt-5 flex'>
                                    <Link to={`/playmovie/${movieDetail?.id}`}>
                                        <button className='bg-red-600 p-4 rounded-lg flex items-center gap-3'><FaCirclePlay /> Xem phim</button>
                                    </Link>

                                    <button className='bg-slate-500 p-4 rounded-lg ml-5 flex items-center gap-3'><IoLogoPlaystation /> Trailler</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-slate-600 mt-5 text-white p-5 flex flex-col gap-3'>
                        <h1 className='text-3xl font-semibold'>Thông tin phim</h1>
                        <p>Tác giả : {getObjectById(movieDetail?.authorID, authors)?.name}</p>
                        <div className='flex gap-3 items-center'>
                            <p>Thể loại :</p>
                            <div className='flex gap-3'>
                                {movieDetail?.listCate?.map((e, i) => (
                                    <button className='p-2 rounded-full border border-white hover:bg-gray-50 hover:text-black'>{getObjectById(e, categories)?.name}</button>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <p>Diễn viên :</p>

                            <div className='flex gap-3'>
                                {movieDetail?.listActor?.map((e, i) => (
                                    <img className='w-10 h-10 rounded-full' src={getObjectById(e, actors)?.imgUrl} alt="" />
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <p>Thời lượng: {movieDetail?.duration} phút</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <p>Gói phim: {getObjectById(movieDetail?.planID,plans)?.title}</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <h1 className='text-3xl text-yellow-400 font-semibold flex items-center gap-3'><FaRegStar /> TOP BẢNG XẾP HẠNG</h1>
                    {getMovieRent(movies, plans, 4).slice(0,6).map((e, i) => (
                        <div className='flex mt-3 gap-3 border-b border-white pb-3'>
                            <div className='w-20'>
                                <img src={e.imgUrl} alt="" />
                            </div>
                            <div className='flex-1 text-white'>
                                <h1 className='text-1xl  font-semibold'>{e.name}</h1>
                                <p>{truncate2(e.description)}</p>
                                <p className='flex items-center gap-3'><CiHeart /> Lượt thích <IoEyeSharp /> 3.000.000 lượt xem</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Detall;