import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/landing';
import Custom404 from '../pages/custom404/custom404';

const Router = () => {
    return (
        <Routes>
            <Route path={'/'} element={<LandingPage />} />
            <Route path={'*'} element={<Custom404 />} />
        </Routes>
    );
};

export default Router;
