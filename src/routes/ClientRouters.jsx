import React from 'react';
import Welcome from '../pages/client/Main/Welcome';
import { Route, Routes } from 'react-router-dom';
import MovieStore from '../pages/client/Main/MovieStore';

function ClientRouters(props) {
    const routers = [
        {
            path : "/",
            Component : <Welcome/>
        },
        {
            path : "/khophim",
            Component : <MovieStore/>
        }
    ];

    return (
        <div>
             <Routes>
                 {routers.map((route,index) => (
                    <Route key={index} path={route.path} element={route.Component}/>
                 ))}
            </Routes>
        </div>
    );
}

export default ClientRouters;