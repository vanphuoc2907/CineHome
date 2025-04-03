import React from 'react';
import MenuAdmin from './MenuAdmin';
import HeaderAdmin from './HeaderAdmin';
import AdminRouters from '../../../routes/AdminRouters';

function HomeAdmin(props) {
    return (
        <div className='md:flex'>
            <MenuAdmin/>
            <div className='md:flex-1 md:h-screen'>
                <HeaderAdmin/>
                <AdminRouters/>        
            </div>
        </div>
    );
}

export default HomeAdmin;