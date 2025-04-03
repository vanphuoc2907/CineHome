import React, { useContext, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { BsCheck2 } from "react-icons/bs";
import { ContextPlans } from '../../../context/PlanProvider';
import { filterById } from '../../../utils/FunctionContants';
import { ContextFeatures } from '../../../context/FeatureProvider';
import { Link } from 'react-router-dom';
function Plan(props) {
    const plans = useContext(ContextPlans);
    const features = useContext(ContextFeatures);
    const [plan,setPlan] = useState(""); 
    return (
        <div className='bg-white p-20'>
            <h1 className='text-center text-3xl font-semibold'>Chọn gói CINEHOME</h1>
            <p className='text-center mb-3'>Hủy bất cứ lúc nào</p>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
                {
                    plans.sort((a,b) => a.level  - b.level).map((e, i) => (
                        <div key={i} onClick={() => setPlan(e.id)} className={`col-span-1 item-plan flex flex-col gap-3 p-5 rounded-lg  ${e.id === plan ? "border-2 border-blue-600" : "" }`}>
                            <h1 className='font-semibold text-2xl'>{e.title}</h1>
                            <p>{parseInt(e.pricePerMonth).toLocaleString('vi-VN')} đ/tháng</p>
                            <hr />
                            {
                                filterById(features,e.id,"planId").map((element,index) => (
                                    <li key={index} className='flex gap-2 items-center '>{element.available == "yes" ? <BsCheck2 className='text-blue-600 text-2xl ' /> : <IoMdClose className='text-red-500' />} {element.text}</li>
                                ))
                            }    
                        </div>
                    ))
                }        
            </div>
             {plan && <div className='text-center mt-5'><Link to={`/payment/${plan}`} className='px-28 py-2 text-white rounded-full bg-blue-600'>Tiep tuc</Link></div> }   
        </div>
    );
}

export default Plan;