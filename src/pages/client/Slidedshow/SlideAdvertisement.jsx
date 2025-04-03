import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

function SlideAdvertisement() {
   const data = [
        "https://assets.glxplay.io/images/w1264/cc24c42d7bfa9a9d23e85d6f06348ec8.png",
        "https://assets.glxplay.io/images/w1264/65143dd5cee86f21440d226b44222775.jpg",
        "https://assets.glxplay.io/images/w1264/2fba34cf01a596a80109e82d3d4dcfd6.jpg",
        "https://assets.glxplay.io/images/w1264/d35f26ba5a39b2b225f9b2ad254595f2.jpg"
    ]
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="mt-5 overflow-hidden"
        >
           {data.map((element,index) => (
            <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                    <img
                        src={element}
                        alt="Slide 1"
                        className="w-full h-full object-cover"
                    />
                </div>
            </SwiperSlide> 
           ))}
            
        </Swiper>
    );
}

export default SlideAdvertisement;



