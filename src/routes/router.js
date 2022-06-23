import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Login from '../pages/login/login';
import LandingPage from '../pages/landing/landing';
import Custom404 from '../pages/custom404/custom404';
import Sellerprofile from '../pages/sellerprofile/Sellerprofile';

import Navbar from '../modules/navbar/navbar';

const WithNav = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

const Router = () => {
    return (
        <Routes>
            <Route element={<WithNav />}>
                <Route path={'/'} element={<LandingPage />} />
            </Route>
            <Route path={'/Login'} element={<Login />} />
            <Route path={'*'} element={<Custom404 />} />
            <Route path={'/seller-profile'} element={<Sellerprofile />} />
        </Routes>
    );
};

export default Router;
