import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import LoginPage from '../pages/login/login';
import LandingPage from '../pages/landing/landing';
import ProductPage from '../pages/product/product';
import Custom404 from '../pages/custom404/custom404';
import Register from '../pages/register/register';

import Navbar from '../modules/navbar/navbar';
import Sellerprofile from '../pages/Sellerprofile/Sellerprofile';

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
                <Route path={'/product/:id'} element={<ProductPage />} />
            </Route>
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'*'} element={<Custom404 />} />
            <Route path={'/seller-profile'} element={<Sellerprofile />} />
        </Routes>
    );
};

export default Router;
