import React, { useContext, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { FaCheckCircle } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import { ContextAuth } from '../../../context/AuthProvider';
import { ROLES } from '../../../utils/Constants';
import { addDocument, updateDocument } from '../../../services/firebaseService';
import { ContextMessages } from '../../../context/MessProvider';
import { formatCommentTime, getObjectById } from '../../../utils/FunctionContants';
import { IoIosCloseCircle } from "react-icons/io";
import { ContextAccounts } from '../../../context/AccountProvider';
const ChatBoxadmin = () => {
    const [chat, setChat] = useState(false);
    const [mess, setMess] = useState('');
    const accounts = useContext(ContextAccounts);
    const { accountLogin } = useContext(ContextAuth);
    const messages = useContext(ContextMessages);
    const [chatUser, setChatUser] = useState([]);
    const [idChatUser, setIdChatUser] = useState("");
    const [chatRoom, setChatRoom] = useState([]);
    const sendmess = async () => {
        const newMess = {
            sender: idChatUser,
            mess: mess,
            timestamp: new Date(),
            type: ROLES.ADMIN,
            status: false
        }
        setMess("");
        await addDocument("Messages", newMess);
    }
    useEffect(() => {
        openChatRoom();
    }, [messages,idChatUser])
    useEffect(() => {
        const latestMessages = new Map();

        messages.forEach((msg) => {
            // Nếu sender đã tồn tại trong Map và tin nhắn hiện tại mới hơn, cập nhật tin nhắn
            if (!latestMessages.has(msg.sender) || latestMessages.get(msg.sender).timestamp < msg.timestamp) {
                latestMessages.set(msg.sender, msg);
            }
        });

        // Convert Map to array and sort by timestamp in descending order (most recent first)
        const sortedMessages = Array.from(latestMessages.values()).sort((a, b) => b.timestamp - a.timestamp);
        setChatUser(sortedMessages);
    }, [messages]);


    const openChatRoom = () => {
        const userMessages = messages
            .filter((msg) => msg.sender === idChatUser)
            .sort((a, b) => a.timestamp - b.timestamp); // Sort messages by timestamp in ascending order
        setChatRoom(userMessages);
        const mesByUser = userMessages.filter((msg) => msg.type === "user" && msg.status === false);

        try {
            mesByUser.map(async (msg) => {
                await updateDocument('Messages', msg.id, { status: true });
            });
        } catch (err) {
            console.error("Error update message: ", err);
        };
    };

    return (
        <>
            {
                chat ? <div className="w-[700px] z-20  h-[400px] rounded-xl shadow-lg bg-white flex flex-col overflow-hidden border fixed bottom-3 right-3">
                    <div className=" flex items-center justify-between  p-3">
                        <div className="flex gap-3 items-center font-semibold">
                            <img className='w-5 h-5 rounded-full' src="https://img.freepik.com/premium-photo/female-customer-service-3d-cartoon-avatar-portrait_839035-197224.jpg" alt="" />
                            <p>Beta Support</p>
                        </div>
                        <button onClick={() => setChat(false)} className="text-gray-400 hover:text-black"><IoIosCloseCircle /></button>
                    </div>
                    <div className='grid grid-cols-4 h-full'>
                        <div className='col-span-1 border-r border-gray-300'>
                            {
                                chatUser.map((e, i) =>
                                    <div onClick={() => setIdChatUser(e.sender)} className={`flex items-center hover:bg-red-400 gap-3 p-3 rounded-md ${e.sender === idChatUser ? "bg-red-400" : "" }`}>
                                        <div>
                                            <img className='w-5 h-5 rounded-full' src="https://img.freepik.com/premium-photo/female-customer-service-3d-cartoon-avatar-portrait_839035-197224.jpg" alt="" />
                                        </div>
                                        <div>
                                            <h1>{getObjectById(e.sender, accounts)?.username}</h1>
                                            <p className='text-sm text-gray-300'>{e.mess}</p>
                                        </div>
                                    </div>

                                )
                            }

                        </div>
                        <div className='col-span-3 flex flex-col'>
                            <div className="p-3 space-y-2 overflow-y-auto h-[300px] bg-gray-50">
                                {chatRoom.map((a, i) =>
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
                        </div>
                    </div>

                </div> : <FaRocketchat onClick={() => setChat(true)} className='fixed bottom-10 right-10 text-4xl text-blue-600 z-20' />}
        </>
    );
};

export default ChatBoxadmin;
