import React from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { faqs } from '../../../utils/Constants';
function Contacts() {
   
    return (
        <div className="bg-gray-100 min-h-screen p-20 ">
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold">PAYMENT METHOD</h1>
                <p className="text-gray-600">Support to solve problems during the use of Beta Movie Service</p>
                <div className='flex justify-center gap-20'>
                    <li className='flex items-center gap-2'><AiOutlineMail /> Email: vanphuoc2907@gmail.com</li>
                    <li className='flex items-center gap-2'><BsTelephone /> 0337560890</li>
                </div>
            </div>
            <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-center mb-4">Frequently Asked Questions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-gray-50 shadow-md rounded-lg p-4">
                            <h4 className="text-lg font-bold mb-2">{faq.title}</h4>
                            <ul className="list-disc pl-4 text-gray-700">
                                {faq.questions.map((q, i) => (
                                    <li key={i} className="mb-2">{q}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Contacts;
