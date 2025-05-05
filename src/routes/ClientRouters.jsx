import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Welcome from '../pages/client/Main/Welcome';
import MovieStore from '../pages/client/Main/MovieStore';
import MovieRent from '../pages/client/Main/MovieRent';
import Plan from '../pages/client/Vip/Plan';
import Detall from '../pages/client/Detall/Detall';
import PlayMovie from '../pages/client/Detall/PlayMovie';
import PaymentForm from '../pages/client/Vip/PaymentForm';
import PlayTrailer from '../pages/client/Detall/PlayTrailer';
import RentMovie from '../pages/client/Vip/RentMovie';
import Contacts from '../pages/client/Main/Contacts';
import Promotions from '../pages/client/Main/Promotions';
import PaymentRent from '../pages/client/Vip/PaymentRent';
import MovieLibrary from '../pages/client/Favorite/MovieLibrary';
import AccountPage from '../pages/client/AccountPage/AccountPage';
import EditProfile from '../pages/client/AccountPage/EditProfile';
import RentPage from '../pages/client/AccountPage/RentPage';
import PlanUser from '../pages/client/AccountPage/PlanUser';

// Router config (element dùng đúng chuẩn React Router v6+)
const routers = [
  { path: "/", element: <Welcome /> },
  { path: "/khophim", element: <MovieStore /> },
  { path: "/rent", element: <MovieRent /> },
  { path: "/plan", element: <Plan /> },
  { path: "/detail/:id", element: <Detall /> },
  { path: "/playmovie/:id", element: <PlayMovie /> },
  { path: "/payment/:id", element: <PaymentForm /> },
  { path: "/playtrailer/:id", element: <PlayTrailer /> },
  { path: "/rentmovie/:id", element: <RentMovie /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/promotions", element: <Promotions /> },
  { path: "/paymentrent/:id", element: <PaymentRent /> },
  { path: "/library", element: <MovieLibrary /> },
  {
    path: "/accountpage",
    element: <AccountPage />,
    children: [
      { path: "", element: <EditProfile /> },
      { path: "/accountpage/rentpage", element: <RentPage /> },
      { path: "/accountpage/sub", element: <PlanUser /> },
    ]
  },
];

// Render routes (recursive)
function renderRoutes(routeArray) {
  return routeArray.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
}

function ClientRouters() {
  return (
    <div className="bg-black pb-5">
      <Routes>
        {renderRoutes(routers)}
      </Routes>
    </div>
  );
}

export default ClientRouters;
