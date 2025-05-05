import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextPackages } from "../../../context/PackageProvider";
import { filterById, getObjectById } from "../../../utils/FunctionContants";
import { useNavigate, useParams } from "react-router-dom";
import { ContextPlans } from "../../../context/PlanProvider";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { initialOptions } from "../../../utils/Constants";
import { ContextAuth } from "../../../context/AuthProvider";
import { addDocument } from "../../../services/firebaseService";
import { useNotification } from "../../../context/NotificationProvider";
import { PAY_MENT } from "../../../utils/Constants"; 

export default function PaymentForm() {

    const { id } = useParams();
    const [selectedPlan, setSelectedPlan] = useState({});
    const [paymentMethod, setPaymentMethod] = useState(PAY_MENT[0]);
    const { accountLogin } = useContext(ContextAuth);
    const [pack, setPack] = useState([]);
    const plans = useContext(ContextPlans);
    const packages = useContext(ContextPackages);
    const packChoose = useRef(selectedPlan);
    const showNotification = useNotification();
    const navigate = useNavigate();
    const price = useRef(0);
    useEffect(() => {
        const data = filterById(packages, id, "planId").sort((a, b) => a.time - b.time);
        setPack(data);
        setSelectedPlan(data[0]);
    }, [id, packages]);

    useEffect(() => {
      packChoose.current = selectedPlan?.id ;
      price.current = parseInt(selectedPlan?.time*getObjectById(id,plans)?.pricePerMonth - selectedPlan?.time*getObjectById(id,plans)?.pricePerMonth*selectedPlan?.discount/100);
    },[selectedPlan]);

  const createSubscription = async (idpay) => {
        const currentPackage = packChoose.current;
        const startDate = new Date();
        const expiryDate = new Date();
        expiryDate.setMonth(startDate.getMonth() + (parseInt(currentPackage.time) || 1));
       const paypal = {
         id_pack : packChoose.current ,
         id_plan : id,
         price : price.current,
         startDate: startDate,
         expiryDate: expiryDate,
         transactionId: idpay,
         accountId : accountLogin.id
       }
       await addDocument("Subscriptions",paypal);
       navigate("/");
       showNotification("You have registered successfully!", "success");
       
  }
    return (
        <div className="p-20 bg-white">
            <h1 className="text-center font-semibold text-2xl">Phương thức thanh toán</h1>
            <div className="text-center text-gray-500"><i className="border-b-4 border-blue-700">Hủy bất cứ lúc nào</i></div>
            <div className="grid grid-cols-7 gap-10">
                <div className="col-span-3">
                    <div className="shadow-lg rounded-lg p-5">
                        <FormControl>
                            <FormLabel sx={{ fontWeight: "bold", marginBottom: "10px" }}>Chọn một tùy chọn</FormLabel> 
                                {
                                    pack?.map((e, i) => (
                                        <RadioGroup sx={{marginTop:"15px"}}  onChange={() => setSelectedPlan(e)}>
                                        <FormControlLabel checked={e.id == selectedPlan.id} value={e.id} control={<Radio />} label={
                                            <div className="flex">
                                                <div className="w-[350px]">
                                                    <h1 className="font-semibold">{e.time} tháng</h1>
                                                    <p className="text-gray-500">tiết kiệm {e.discount}%</p>
                                                </div>
                                                <div>
                                                    <h1 className="font-semibold">{parseInt(e.time*getObjectById(id,plans)?.pricePerMonth - e.time*getObjectById(id,plans)?.pricePerMonth*e.discount/100).toLocaleString('vi-VN')} <sup>đ</sup></h1>
                                                    <h1 className="text-gray-500 line-through" >{parseInt(e.time*getObjectById(id,plans)?.pricePerMonth).toLocaleString('vi-VN')} <sup>đ</sup></h1>
                                                </div>
                                            </div>
                                        } />
                                  </RadioGroup>
                                    ))
                                }
                           
                        </FormControl>
                    </div>
                    <div className="shadow-lg rounded-lg p-5 mt-3">
                        <div className="flex justify-between">
                            <div className="font-semibold" >Thông tin thanh toán</div>
                            <div className="text-blue-600">Thay đổi gói</div>
                        </div>
                        <div className="flex gap-5 mt-4">
                            <div className="">
                                <img className="w-[100px] h-[100px]" src="https://i.pinimg.com/564x/2b/bf/18/2bbf181184d84f21621953b14a642604.jpg" alt="" />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Tài khoản</div>
                                    <div className="font-semibold">{accountLogin?.email}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Tên gói</div>
                                    <div className="font-semibold">{getObjectById(id,plans)?.title}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Thời hạn</div>
                                    <div className="text-blue-600">{selectedPlan?.time} tháng</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Ngày hiệu lực</div>
                                    <div className="font-semibold">{new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Ngày gia hạn</div>
                                    <div className="font-semibold">{new Date(new Date().setMonth(new Date().getMonth() + (parseInt(selectedPlan?.time) || 0))).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                                </div>                     
                                <hr />
                                <div className="flex justify-between">
                                    <div className="font-semibold" >Tổng</div>
                                    <div className="text-red-600">{parseInt(selectedPlan?.time*getObjectById(id,plans)?.pricePerMonth - selectedPlan?.time*getObjectById(id,plans)?.pricePerMonth*selectedPlan?.discount/100).toLocaleString('vi-VN')} <sup>đ</sup></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <h1 className="font-semibold text-2xl my-5">Phương thức thanh toán</h1>
                    <div className=" flex gap-3">
                        {PAY_MENT.map((e,i) =>(
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
                                    const currentPackage = packChoose.current;
                                    const total = price.current;

                                    if (!currentPackage) {
                                        alert("Vui lòng chọn gói trước khi thanh toán.");
                                        return;
                                    }
                                    const priceInUSD = (total / 24000).toFixed(2); // Chuyển từ VND sang USD
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

    )
}