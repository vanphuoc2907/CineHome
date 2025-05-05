import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaPlayCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { handleClick } from '../../../services/playMovie';
import { ContextAuth } from '../../../context/AuthProvider';
import { ContextPlans } from '../../../context/PlanProvider';
import { truncate } from '../../../utils/FunctionContants';
import { addDocument, deleteDocument } from '../../../services/firebaseService';
import { useNotification } from '../../../context/NotificationProvider';
import { ContextFavorites } from '../../../context/FavoritesProvider';
import { FaMinus } from "react-icons/fa";

function SlideMovie({ data, title }) {
    const { accountLogin } = useContext(ContextAuth);
    const favorites = useContext(ContextFavorites);
    const plans = useContext(ContextPlans);
    const showNotification = useNotification();
    const navigate = useNavigate();

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

        const result = favorites?.find(e => e.movieId == id ||0 && e.accountId == accountLogin.id);     
        return result ? true : false
    };
    
    return (
        <div>
            <h1 className="text-xl text-white font-bold bg-black py-3 ps-3">{title}</h1>
            <Swiper
                className=""
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10} // Khoảng cách giữa các slide
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    640: { // Tablet (640px - 1023px)
                        slidesPerView: 3, // Hiển thị 3 hình trên tablet
                    },
                    1024: { // Desktop (>= 1024px)
                        slidesPerView: 5, // Hiển thị 5 hình trên desktop/laptop
                    },
                }}
            >
                {data?.map((element, index) => (
                    <SwiperSlide key={index} className="bg-black">
                        <div className="relative group">
                            <div className="relative overflow-hidden w-full h-full">
                                <img
                                    className="object-cover h-[200px] transition-transform duration-300 ease-in-out transform hover:scale-110"
                                    src={element.imgUrl}
                                    alt="#"
                                />
                            </div>
                            {/* Thẻ div hiện khi hover */}
                            <div className="absolute bottom-0 bg-black bg-opacity-50 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out w-full p-2">
                                <div className="flex items-center justify-around text-white">
                                    <FaPlayCircle onClick={() => handleClick(element, accountLogin, plans, navigate)} size={25} className="hover:text-teal-400 transition-colors duration-300" />
                                    <FaHeart size={25} className="text-red-400 transition-colors duration-300" />
                                    <div onClick={() => favoritesfun(element?.id)}>
                                        {
                                            checkFavorites(element?.id)
                                                ? <FaMinus size={25} className="hover:text-amber-400 transition-colors duration-300" />
                                                : <FaPlus  size={25} className="hover:text-amber-400 transition-colors duration-300" />
                                        }
                                    </div>
                                </div>
                                <div className="ms-2 mt-2">
                                    <h1 className="text-sm text-white font-bold">{element?.name}</h1>
                                </div>
                                <div className="flex ms-2">
                                    <h1 className="text-sm text-white">{truncate(element?.description)}</h1>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SlideMovie;