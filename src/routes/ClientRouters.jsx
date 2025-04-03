import React from 'react';
import Welcome from '../pages/client/Main/Welcome';
import { Route, Routes } from 'react-router-dom';
import MovieStore from '../pages/client/Main/MovieStore';
import { Component } from 'react';
import MovieRent from '../pages/client/Main/MovieRent';
import Plan from '../pages/client/Vip/Plan';
import Detall from '../pages/client/Detall/Detall';
import PlayMovie from '../pages/client/Detall/PlayMovie';
import PaymentForm from '../pages/client/Vip/PaymentForm';

function ClientRouters(props) {
    const routers = [
        {
            path : "/",
            Component : <Welcome/>
        },
        {
            path : "/khophim",
            Component : <MovieStore/>
        },
        {
            path : "/rent",
            Component : <MovieRent/>
        },
        {
            path : "/plan",
            Component : <Plan/>
        },
        {
            path : "/detail/:id",
            Component : <Detall/>
        },
        {
            path : "/playmovie/:id",
            Component : <PlayMovie/>
        },
        {
            path : "/payment/:id",
            Component : <PaymentForm/>
        }
    ];

    return (
        <div className='bg-black pb-5'>
             <Routes>
                 {routers.map((route,index) => (
                    <Route key={index} path={route.path} element={route.Component}/>
                 ))}
            </Routes>
        </div>
    );
}

export default ClientRouters;