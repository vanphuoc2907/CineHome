import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextPackages } from "../../../context/PackageProvider";
import { filterById, getObjectById } from "../../../utils/FunctionContants";
import { useNavigate, useParams } from "react-router-dom";
import { ContextPlans } from "../../../context/PlanProvider";
import { ContextAuth } from "../../../context/AuthProvider";
import { addDocument } from "../../../services/firebaseService";
import { useNotification } from "../../../context/NotificationProvider";
import { initialOptions, PAY_MENT } from "../../../utils/Constants";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ContextMovies } from "../../../context/MovieProvider";
export default function PaymentForms() {
    const { id } = useParams();
    const movies = useContext(ContextMovies);
    const [movie,setMovie] = useState({});
    const [selectedPlan, setSelectedPlan] = useState({});
    const [paymentMethod, setPaymentMethod] = useState(PAY_MENT[0]);
    const { accountLogin } = useContext(ContextAuth);
    const showNotification = useNotification();
    const navigate = useNavigate();
    const rentPriceRef = useRef(0);
    useEffect(() => {
       const movieNew = getObjectById(id,movies);
       setMovie(movieNew);
    }, [id,movies]);
    useEffect(() => {
        rentPriceRef.current = movie?.rentalPrice;
    }, [id, movie]);

    const createSubscription = async (idpay) => {
        const startDate = new Date();
        const expiryDate = new Date();
        expiryDate.setMonth(startDate.getMonth() + 1);
        const paypal = {
            movieId : id ,
            price: movie.rentalPrice,
            startDate: startDate,
            expiryDate: expiryDate,
            transactionId: idpay,
            accountId: accountLogin.id
        }
        await addDocument("RentMovies", paypal);
        navigate("/");
        showNotification("You have registered successfully!", "success");

    }

    return (
        <div className="p-20 bg-white">
            <h1 className="text-center font-semibold text-2xl">Bạn đang thuê phim</h1>
            <div className="text-center text-gray-500"><i className="border-b-4 border-blue-700">Hủy bất cứ lúc nào</i></div>
            <div className="grid grid-cols-7 gap-10">
                <div className="col-span-3">         
                    <div className="shadow-lg rounded-lg p-5 mt-3">
                        <div className="flex justify-between">
                            <div className="font-semibold" >Thông tin thanh toán</div>
                            <div className="text-blue-600">Thông tin phim</div>
                        </div>
                        <div className="flex gap-5 mt-4">
                            <div className="">
                                <img className="w-[150px] h-[200px] rounded-lg" src={movie?.imgUrl} alt="" />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Tài khoản</div>
                                    <div className="font-semibold">{accountLogin?.email}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Tên phim</div>
                                    <div className="font-semibold">{movie?.name}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Thời hạn</div>
                                    <div className="text-blue-600">1 tháng</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Ngày hiệu lực</div>
                                    <div className="font-semibold">{new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Ngày gia hạn</div>
                                    <div className="font-semibold">{new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                                </div>
                                <hr />
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Tổng</div>
                                    <div className="text-red-600">{parseInt(movie?.rentalPrice).toLocaleString('vi-VN')} <sup>đ</sup></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <h1 className="font-semibold text-2xl my-5">Phương thức thanh toán</h1>
                    <div className=" flex gap-3">
                        {PAY_MENT.map((e, i) => (
                            <button className={`border-2  p-5 rounded-lg flex-1 ${paymentMethod.id === e.id ? "border-blue-600" : "border-gray-600"}`}>
                                <p className="font-semibold">{e.name}</p>
                                <img className="w-[50px] h-[50px] m-auto mt-2" src={e.img} alt="" />
                            </button>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={(data, actions) => {
                                    console.log(rentPriceRef.current);
                                    
                                    const priceInUSD = (rentPriceRef.current / 24000).toFixed(2); // Chuyển từ VND sang USD
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: priceInUSD
                                            }
                                        }]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        const transactionId = details.id; // Lấy ID giao dịch từ PayPal
                                        createSubscription(transactionId);
                                    });
                                }}
                                onError={(err) => {
                                    console.error("PayPal error:", err);
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}