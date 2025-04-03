import React from 'react';

const Footer = () => {
    return (
        <div className="bg-gray-900 text-gray-300 p-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Cột 1: Thông tin công ty */}
                <div>
                    <h2 className="text-white text-2xl font-semibold mb-3">CINEHOME</h2>
                    <p className="text-sm">
                        CINEHOME là dịch vụ được cung cấp bởi Công ty Cổ Phần CINEHOME, thành viên của Công ty Cổ Phần Giải Trí. 
                    </p>
                    <p className="mt-2 text-sm">Địa chỉ: 425 Tôn Đức Thắng, Phường Hòa Khánh Nam, Quận Liên Chiểu, TP.ĐN, Việt Nam.</p>
                    <p className="mt-2 text-sm">Mã số doanh nghiệp: 010653959</p>
                </div>

                {/* Cột 2: Giới thiệu */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-2">GIỚI THIỆU</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400">Quy chế sử dụng Dịch vụ</a></li>
                        <li><a href="#" className="hover:text-blue-400">Chính sách bảo mật</a></li>
                        <li><a href="#" className="hover:text-blue-400">Khuyến mãi</a></li>
                    </ul>
                </div>

                {/* Cột 3: Hỗ trợ */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-2">HỖ TRỢ</h3>
                    <p>1900 8675 (24/7)</p>
                    <p>play@cinehome.com.vn</p>
                    <a href="https://galaxyplay.vn/help" className="hover:text-blue-400">https://cinehome.vn/help</a>
                </div>

                {/* Cột 4: Tải ứng dụng & Mạng xã hội */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-2">TẢI ỨNG DỤNG</h3>
                    <div className="flex gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                        <img src="https://www.virtualphysicaltherapists.com/wp-content/uploads/2017/07/itunes-app-store-logo.png" alt="App Store" className="h-10" />
                    </div>
                    <h3 className="text-white text-lg font-semibold mt-4 mb-2">KẾT NỐI VỚI CHÚNG TÔI</h3>
                    <div className="flex gap-4">
                        <i className="fab fa-facebook-f text-2xl cursor-pointer hover:text-blue-500"></i>
                        <i className="fab fa-instagram text-2xl cursor-pointer hover:text-pink-500"></i>
                        <i className="fab fa-youtube text-2xl cursor-pointer hover:text-red-500"></i>
                        <i className="fab fa-tiktok text-2xl cursor-pointer hover:text-white"></i>
                        <i className="fab fa-zalo text-2xl cursor-pointer hover:text-blue-400"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;