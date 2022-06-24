import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import LoginPage from '../pages/login/login';
import LandingPage from '../pages/landing/landing';
import ProductPage from '../pages/product/product';
import Custom404 from '../pages/custom404/custom404';
import Register from '../pages/register/register';
import SellerPage from '../pages/seller/seller';

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
                <Route path={'/product/:id'} element={<ProductPage />} />
                <Route path={'/seller'} element={<SellerPage />} />
            </Route>
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'*'} element={<Custom404 />} />
        </Routes>
    );
};

export default Router;
