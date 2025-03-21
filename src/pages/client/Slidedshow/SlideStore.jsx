import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

function SlideStore(props) {
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
            {/* Slide with Overlay */}
            <SwiperSlide>
                <div className="relative w-full h-full">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfmT8Uk53wHhImSNoLFurJu_Mk4EwdrWU94w&s"
                        alt="Slide 1"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute top-0 inset-0 bg-black bg-opacity-50 flex flex-col justify-center pl-40">
                        {/* Description */}
                        <div className="text-white mb-4">
                            <h2 className="text-3xl font-bold mb-2">Tên Phim: Siêu Phẩm Hành Động</h2>
                            <p className="text-base">
                                Một bộ phim đầy kịch tính, hành động mãn nhãn với những pha rượt đuổi nghẹt thở.
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

            {/* Slide 2 */}
            <SwiperSlide>
                <img
                    src="https://i.ytimg.com/vi/IKYvVeWt_n4/maxresdefault.jpg"
                    alt="Slide 2"
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
                <img
                    src="https://sm.ign.com/t/ign_nordic/lists/t/the-10-hig/the-10-highest-grossing-marvel-movies-of-all-time_78at.1280.jpg"
                    alt="Slide 3"
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>
        </Swiper>
    );
}

export default SlideStore;
