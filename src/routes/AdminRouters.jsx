import React, { Component } from 'react';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import Categories from '../pages/admin/Categories/Categories';
import Movies from '../pages/admin/Media_Management/Movies/Movies';
import Episode from '../pages/admin/Media_Management/Episode/Episode';
import Trailer from '../pages/admin/Media_Management/Trailer/Trailer';
import Package from '../pages/admin/Vip/Package/Package';
import Feature from '../pages/admin/Vip/Feature/Feature';
import Watchlist from '../pages/admin/Engagement_Pages/Watchlist/Watchlist';
import Actor from '../pages/admin/Cast&Crew/Actor/Actor';
import { Route, Routes } from 'react-router-dom';
import Plans from '../pages/admin/Vip/Plans/Plans';
import Like from '../pages/admin/Engagement_Pages/Likes/Like';
import Comment from '../pages/admin/Engagement_Pages/Comment/Comment';
import Author from '../pages/admin/Cast&Crew/Author/Author';
import Character from '../pages/admin/Cast&Crew/Character/Character';

function AdminRouters(props) {
    const routers = [
        {
            path: "/",
            Component : <Dashboard/>
        },
        {
            path: "/categories",
            Component: <Categories/>
        },
        {
            path: "/movies",
            Component: <Movies/>
        },
        {
            path: "/episode",
            Component: <Episode/>
        },

        {
            path: "/trailer",
            Component: <Trailer/>
        },
        {
            path: "/package",
            Component: <Package/>
        },
        {
            path: "/feature",
            Component: <Feature/>
        },
        {
            path: "/plans",
            Component: <Plans/>
        },
        {
            path: "/like",
            Component: <Like/>
        },
        {
            path: "/watchlist",
            Component: <Watchlist/>
        },
        {
            path: "/comment",
            Component: <Comment/>
        },
        {
            path: "/author",
            Component: <Author/>
        },
        {
            path: "/character",
            Component: <Character/>
        },
        {
            path:"/actor",
            Component: <Actor/>
        },
    ]
    return (
        <div className='p-3'>
            <Routes>
                 {routers.map((route,index) => (
                    <Route path={route.path} element={route.Component}/>
                 ))}
            </Routes>
        </div>
    );
}

export default AdminRouters;