import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { truncate2 } from '../../../utils/FunctionContants';

function SlideStore({data}) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="h-[80vh] overflow-hidden"
        >
           {data.map((element,index) => (
            <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                    <img
                        src={element.imgUrl}
                        alt="Slide 1"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute top-0 inset-0 bg-black bg-opacity-50 flex flex-col justify-center pl-40">
                        {/* Description */}
                        <div className="text-white mb-4">
                            <h2 className="text-3xl font-bold mb-2">Tên Phim: {element.name}</h2>
                            <p className="text-base">
                              {truncate2(element.description)}
                            </p>
                        </div>
                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300">
                                Xem phim
                            </button>
                            <button className="px-6 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400 transition-all duration-300">
                                Xem trailer
                            </button>
                        </div>
                    </div>
                </div>
            </SwiperSlide> 
           ))}
            
        </Swiper>
    );
}

export default SlideStore;
