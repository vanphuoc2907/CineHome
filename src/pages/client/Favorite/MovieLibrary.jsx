import React, { useContext, useEffect, useState } from 'react';
import { ContextFavorites } from '../../../context/FavoritesProvider';
import { ContextAuth } from '../../../context/AuthProvider';
import { ContextPlans } from '../../../context/PlanProvider';
import { Link, useNavigate } from 'react-router-dom';
import { ContextMovies } from '../../../context/MovieProvider';
import { getObjectById, truncate, truncate2 } from '../../../utils/FunctionContants';
import { handleClick } from '../../../services/playMovie';
import { addDocument, deleteDocument } from '../../../services/firebaseService';
import { useNotification } from '../../../context/NotificationProvider';
import { FaHeart, FaMinus, FaPlayCircle, FaPlus } from 'react-icons/fa';

function MovieLibrary(props) {
    const { accountLogin } = useContext(ContextAuth);
    const favorites = useContext(ContextFavorites);
    const movies = useContext(ContextMovies);
      const showNotification = useNotification();
    const plans = useContext(ContextPlans);
    const [showFa, setShowFa] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const result = favorites.filter(e => e.accountId == accountLogin.id);
        setShowFa(result);
    }, [movies, favorites, accountLogin]);

    const favoritesfun = async (id) => {
        const result = favorites?.find(e => e.movieId == id && e.accountId == accountLogin.id);
        if (result) {
            await deleteDocument("Favorites", result.id);
            showNotification("Removed from favorites!", "error");
        } else {
            const favor = {
                movieId: id,
                accountId: accountLogin.id
            };
            await addDocument("Favorites", favor);
            showNotification("Added to favorites!", "success");
        }

    }
    const checkFavorites = (id) => {
        const result = favorites?.find(e => e.movieId == id && e.accountId == accountLogin.id);
        return result ? true : false
    }

    return (
        <div className='px-10 pt-20'>
            <div className="grid grid-cols-3 text-white">
                <div className="col-span-2">
                    <h1 className='font-semibold text-2xl'>Danh sách yêu thích</h1>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {
                            showFa.map((fa, index) => (
                                <div key={index} className="col-span-1 relative w-full h-full relative group">
                                    <div className="relative overflow-hidden w-full h-full">
                                        <img
                                            className="object-cover h-[200px] transition-transform duration-300 ease-in-out transform hover:scale-110"
                                            src={getObjectById(fa.movieId,movies)?.imgUrl}
                                            alt="#"
                                        />
                                    </div>
                                    {/* Thẻ div hiện khi hover */}
                                    <div className="absolute bottom-0 bg-black bg-opacity-50 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out w-full p-2">
                                        <div className="flex items-center justify-around text-white">
                                            <FaPlayCircle onClick={() => handleClick(getObjectById(fa.movieId,movies), accountLogin, plans, navigate)} size={25} className="hover:text-teal-400 transition-colors duration-300" />
                                            <FaHeart size={25} className="text-red-400 transition-colors duration-300" />
                                            <div onClick={() => favoritesfun(getObjectById(fa.movieId,movies)?.id)}>
                                                {
                                                    checkFavorites(getObjectById(fa.movieId,movies)?.id)
                                                        ? <FaMinus size={25} className="hover:text-amber-400 transition-colors duration-300" />
                                                        : <FaPlus size={25} className="hover:text-amber-400 transition-colors duration-300" />
                                                }
                                            </div>
                                        </div>
                                        <div className="ms-2 mt-2">
                                            <h1 className="text-sm text-white font-bold">{getObjectById(fa.movieId,movies)?.name}</h1>
                                        </div>
                                        <div className="flex ms-2">
                                            <h1 className="text-sm text-white">{truncate(getObjectById(fa.movieId,movies)?.description)}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-span-1">
                    {/* Nội dung sidebar hoặc để trống */}
                </div>
            </div>

        </div>
    );
}

export default MovieLibrary;