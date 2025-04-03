import React from 'react';
import SlideBanner from '../Slidedshow/SlideBanner';

function Welcome(props) {
    return (
        <div>
            <SlideBanner />
            <div className='mx-40 text-white mt-5'>
                <div className="grid lg:grid-cols-2 grid-cols-1 ">
                    <div className="col-span-1 flex flex-col gap-3">
                        <h1 className='text-3xl font-semibold'>Giải trí online không giới hạn hàng nghìn giờ nội dung đậm chất Việt</h1>
                        <li>Bom tấn Việt chiếu rạp độc quyền và sớm nhất</li>
                        <li>Thư viện phim Việt lớn nhất Việt Nam</li>
                        <li>Phim Bộ độc quyền Galaxy Play</li>
                        <li>Phim Bộ Hot Châu Á</li>
                        <li>Siêu phẩm điện ảnh Hollywood và Disney</li>
                        <li><button className='border border-white rounded-full p-3 hover:bg-gray-400 hover:text-black'>Đăng ký ngay</button></li>
                        <li>100+ đối tác sản xuất phim trong nước và quốc tế</li>
                        <li className='flex justify-evenly mt-3'>
                            <img className='w-10 h-auto' src="https://assets.glxplay.io/web/responsive/w200/sony2.png" alt="" />
                            <img className='w-10 h-auto' src="https://assets.glxplay.io/web/responsive/w200/universal.png" alt="" />
                            <img className='w-10 h-auto' src="https://assets.glxplay.io/web/responsive/w200/disney.png" alt="" />
                            <img className='w-10 h-auto' src="https://assets.glxplay.io/web/responsive/w200/MGM.png" alt="" />
                            <img className='w-10 h-auto' src="https://assets.glxplay.io/web/responsive/w200/hk-entertainment.png" alt="" />
                        </li>
                    </div>
                    <div className="col-span-1">
                        <div className="grid grid-cols-3 gap-5">
                            <div className="col-span-1">
                                <img className='rounded-lg' src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5a/Thi%C3%AAn_nga_b%C3%B3ng_%C4%91%C3%AAm.jpeg/250px-Thi%C3%AAn_nga_b%C3%B3ng_%C4%91%C3%AAm.jpeg" alt="" />
                            </div>
                            <div className="col-span-1">
                                <img className='rounded-lg -translate-y-5' src="https://assets.glxplay.io/images/w600/title/chi-me-hoc-yeu-honey-we-need-to-talk_web_posterPortrait_08315b77da1e1045f9553266817ead50.jpg" alt="" />
                            </div>
                            <div className="col-span-1">
                                <img className='rounded-lg' src="https://upload.wikimedia.org/wikipedia/vi/3/3c/%C3%81p_ph%C3%ADch_phim_Ph%C3%B9_th%E1%BB%A7y_t%E1%BB%91i_th%C6%B0%E1%BB%A3ng_trong_%C4%90a_V%C5%A9_tr%E1%BB%A5_h%E1%BB%97n_lo%E1%BA%A1n.jpg" alt="" />
                            </div>
                            <div className="col-span-1">
                                <img className='rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG7TK-IEnJQdmQhs3o_YUhm7ORFF7jIUfjqw&s" alt="" />
                            </div>
                            <div className="col-span-1">
                                <img className='rounded-lg -translate-y-5' src="https://upload.wikimedia.org/wikipedia/vi/9/9f/%C3%81p_ph%C3%ADch_phim_Ch%C3%ACa_kh%C3%B3a_tr%C4%83m_t%E1%BB%B7%2C_2022.jpg" alt="" />
                            </div>
                            <div className="col-span-1">
                                <img className='rounded-lg' src="https://cinema.momocdn.net/img/80099757410724750-doemon.png?size=M" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-5">
                    <div className="cols-span-1 flex flex-col gap-5">
                        <h1>Chia sẻ từng khoảnh khắc cùng người thân và bạn bè</h1>
                        <li className='flex gap-5 items-center'>
                            <h1 className='text-7xl font-semibold'>1</h1>
                            <p className='text-3xl font-semibold'>Tài khoản <br />Galaxy Play Cao Cấp</p>
                        </li>
                        <h1>Đăng nhập</h1>
                        <li className='flex gap-5 items-center'>
                            <h1 className='text-7xl font-semibold'>5</h1>
                            <p className='text-3xl font-semibold'>Thiết bị </p>
                        </li>
                        <h1>Xem trên</h1>
                        <li className='flex gap-5 items-center'>
                            <h1 className='text-7xl font-semibold'>4</h1>
                            <p className='text-3xl font-semibold'>Thiết bị song song <br /> cùng lúc</p>
                        </li>
                        <li><button className='border border-white rounded-full p-3 hover:bg-gray-400 hover:text-black'>Đăng ký ngay</button></li>
                    </div>
                    <div className="col-span-1">
                        <img src="https://assets.glxplay.io/web/responsive/w1000/Spotlight%20on%20Device_VER2%20X1.png" alt="" />
                    </div>
                </div>
                <h1 className='text-center font-semibold text-4xl mt-10'>Bạn có 2 cách để thưởng thức CINEHOME</h1>
                <div className="grid grid-cols-2 mt-5 gap-5">
                    <div className="col-span-1">
                        <div className='h-[330px]'>
                            <img src="https://media.vov.vn/uploaded/9eqrbt2uv7o/2019_12_23/untitled_4_ekeq.jpg" alt="" />
                        </div>
                        <p className='mt-5'>TIỆC “BUFFET” <button className='bg-yellow-500 p-2 rounded-lg'>XEM PHIM GÓI</button></p>
                        <p className='mt-3'>Chỉ 70K/tháng, thoả thích xem hàng ngàn bộ phim gồm: Phim Việt bom tấn, phim bộ Độc Quyền Galaxy Play, phim Hollywood và Disney tuyển chọn và phim bộ Châu Á gay cấn, hấp dẫn.</p>
                    </div>
                    <div className="col-span-1">
                        <div className='h-[330px]'>
                            <img src="https://cdn.tuoitrethudo.vn/stores/news_dataimages/ngokhucquanganh/062021/14/08/2509_Poster_1.jpg?rt=20210614082516" alt="" />
                        </div>
                        <p className='mt-5'>CHỌN MÓN<button className='bg-yellow-500 p-2 rounded-lg'>THUÊ PHIM LẺ</button></p>
                        <p className='mt-3'>Thưởng thức những bộ phim MỚI ngay sau ra rạp, tại mục Phim Thuê Đặc Sắc, trên nền tảng Galaxy Play. Lưu ý: Bạn không cần đăng ký mua Phim Gói, mà chỉ trả theo từng Phim Thuê mình yêu thích.</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-20 mt-20">
                    <div className="col-span-1">
                        <img src="https://assets.glxplay.io/web/responsive/w500/home-page-iphone-12-pro-max.png" alt="" />
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                        <div className='flex flex-col gap-5'>
                            <h1 className=' font-semibold text-4xl'>Nội dung đặc sắc, trải nghiệm mượt mà trên thiết bị di động</h1>
                            <p>1 tài khoản Galaxy Play Mobile</p>
                            <p>1 Smartphone hoặc máy tính bảng</p>
                            <p>Xem mọi lúc, mọi nơi!</p>
                            <li><button className='border border-white rounded-full p-3 hover:bg-gray-400 hover:text-black'>Đăng ký ngay</button></li>
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-2 gap-20 mt-20">
                    <div className="col-span-1 flex justify-center items-center">
                        <div className='flex flex-col gap-5'>
                            <h1 className=' font-semibold text-4xl'>Không chèn quảng cáo khi xem phim</h1>
                            <p>Tận hưởng trọn vẹn, không gián đoạn mỗi phút giây cảm xúc khi thưởng thức bộ phim yêu thích.</p>
                            <li><button className='border border-white rounded-full p-3 hover:bg-gray-400 hover:text-black'>Đăng ký ngay</button></li>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <img src="https://assets.glxplay.io/web/responsive/plain/WEB-GP_1221_TV_KID_500x460.png" alt="" />
                    </div>
                </div>
                <h1 className='text-center font-semibold text-5xl mt-10'>Thoải mái xem phim trên TV tại nhà</h1>
                <p className='text-center mt-5'>Đắm chìm trong từng thước phim cùng công nghệ hình ảnh 4K sắc nét và dải âm thanh Dolby 5.1 sống động <br /> duy nhất tại Việt Nam.</p>
                <li className='text-center'><button className='border border-white rounded-full p-3 hover:bg-gray-400 hover:text-black mt-5'>Đăng ký ngay</button></li>
                <div>
                    <img className='m-auto mt-5' src="https://assets.glxplay.io/web/responsive/plain/TV-tizen.png" alt="" />
                </div>
                <h1 className='text-center font-semibold text-4xl mt-10'>Vũ trụ giải trí điện ảnh, đậm màu sắc Việt.</h1>
                <h1 className='text-center font-semibold text-4xl mt-5 mb-5'>Chất lượng tuyệt đỉnh, trải nghiệm mượt mà.</h1>
            </div>
        </div>
    );
}

export default Welcome;