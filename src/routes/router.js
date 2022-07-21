import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import LoginPage from '../pages/login/login';
import LandingPage from '../pages/landing/landing';
import ProductPage from '../pages/product/product';
import Custom404 from '../pages/custom404/custom404';
import Register from '../pages/register/register';
import SellerPage from '../pages/seller/seller';
import ProfilePage from '../pages/profile/profile';
import TransactionPage from '../pages/transaction/transaction';
import PaymentPage from '../pages/payment/payment.js';
import SearchPage from '../pages/search/search';
import InvoicePage from '../pages/invoice/invoice';
import WishlistPage from '../pages/wishlist/wishlist';

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
                <Route path={'/profile'} element={<ProfilePage />} />
                <Route path={'/seller'} element={<SellerPage />} />
                <Route path={'/transaction/'} element={<TransactionPage />} />
                <Route path={'/transaction/:id'} element={<PaymentPage />} />
                <Route path={'/search'} element={<SearchPage />} />
                <Route path={'/wishlist'} element={<WishlistPage />} />
            </Route>
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/invoice/:id'} element={<InvoicePage />} />
            <Route path={'*'} element={<Custom404 />} />
        </Routes>
    );
};

export default Router;
