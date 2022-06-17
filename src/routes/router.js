import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import LandingPage from '../pages/landing/landing';
import Custom404 from '../pages/custom404/custom404';

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
            <Route path={'*'} element={<Custom404 />} />
        </Routes>
    );
};

export default Router;
