import React, { useContext, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { FaCheckCircle } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import { ContextAuth } from '../../../context/AuthProvider';
import { ROLES } from '../../../utils/Constants';
import { addDocument } from '../../../services/firebaseService';
import { ContextMessages } from '../../../context/MessProvider';
import { formatCommentTime } from '../../../utils/FunctionContants';
import { IoIosCloseCircle } from "react-icons/io";
import { useNotification } from '../../../context/NotificationProvider';
const ChatBox = () => {
    const [chat, setChat] = useState(false);
    const [mess, setMess] = useState('');
    const { accountLogin } = useContext(ContextAuth);
    const messages = useContext(ContextMessages);
    const [chatUser, setChatUser] = useState([]);
    const showNotification = useNotification();

    const sendmess = async () => {
        const newMess = {
            sender: accountLogin.id,
            mess: mess,
            timestamp: new Date(),
            type: ROLES.USER
        }
        setMess("");
        await addDocument("Messages", newMess);
        const check = messages.find(e => e.sender == accountLogin.id);
        if (!check) {
            const newMessAd = {
                sender: accountLogin.id,
                mess: "Vui lòng đợi tôi trong giây lát",
                timestamp: new Date(),
                type: ROLES.ADMIN,
                status: false
            }
            await addDocument("Messages", newMessAd);
        }
}

const openChatRoom = () => {
    if (!accountLogin) {
        showNotification("Please log in!", "error");
        return
    }
    const listChat = messages.filter(a => a.sender == accountLogin.id).sort((a, b) => a.timestamp - b.timestamp);
    setChatUser(listChat);
    setChat(true);
}
useEffect(() => {
    openChatRoom();
}, [messages]);
return (
    <>
        {
            chat ? <div className="w-[350px] z-20  h-[400px] flex flex-col rounded-xl shadow-lg bg-white flex flex-col overflow-hidden border fixed bottom-3 right-3">
                <div className=" flex items-center justify-between  p-3">
                    <div className="flex gap-3 items-center font-semibold">
                        <img className='w-5 h-5 rounded-full' src="https://img.freepik.com/premium-photo/female-customer-service-3d-cartoon-avatar-portrait_839035-197224.jpg" alt="" />
                        <p>Beta Support</p>
                    </div>
                    <button onClick={() => setChat(false)} className="text-gray-400 hover:text-black"><IoIosCloseCircle /></button>
                </div>
                <div className="p-3 flex-1 space-y-2 overflow-y-auto bg-gray-50">
                    {chatUser.map((a, i) =>
                        a.type == "user" ? <div className='w-[70%] ml-auto p-3 rounded-lg bg-blue-600 text-white'>
                            <p>{a.mess}</p>
                            <p className='text-sm flex text-gray-400 justify-end items-center gap-1'>{formatCommentTime(a.timestamp)}<FaCheckCircle /></p>
                        </div> :
                            <div className='w-[70%] flex gap-2'>
                                <img className='w-5 h-5 rounded-full self-end' src="https://img.freepik.com/premium-photo/female-customer-service-3d-cartoon-avatar-portrait_839035-197224.jpg" alt="" />
                                <div className='p-3 rounded-lg bg-red-200 text-white'>
                                    <p>{a.mess}</p>
                                    <p className='text-sm flex  text-gray-400 justify-end items-center gap-1'>1 minutes ago <FaCheckCircle /></p>
                                </div>
                            </div>
                    )}


                </div>
                <div className="p-2 flex items-center gap-2 border-t">
                    <input
                        className="flex-1 px-3 py-1 text-sm border rounded-full focus:outline-none"
                        placeholder="Type a message..."
                        value={mess}
                        onChange={(e) => setMess(e.target.value)}

                    />
                    <button onClick={sendmess} >
                        <Send className="w-5 h-5 text-blue-500" />
                    </button>
                </div>
            </div> : <FaRocketchat onClick={openChatRoom} className='fixed bottom-10 right-10 text-4xl text-blue-600 z-20' />}
    </>
);
};

export default ChatBox;
