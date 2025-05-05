import React from 'react';
import MenuAdmin from './MenuAdmin';
import HeaderAdmin from './HeaderAdmin';
import AdminRouters from '../../../routes/AdminRouters';
import ChatBoxadmin from '../Chatbox/Chatboxadmin';

function HomeAdmin(props) {
    return (
        <div className='md:flex'>
            <MenuAdmin/>
            <div className='md:flex-1 md:h-screen overflow-auto'>
                <HeaderAdmin/>
                <AdminRouters/>  
                <ChatBoxadmin/>      
            </div>
        </div>
    );
}

export default HomeAdmin;