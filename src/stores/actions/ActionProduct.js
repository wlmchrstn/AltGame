import axios from 'axios';
import { SHOW_ALL_PRODUCT, SHOW_PRODUCT, SEARCH_PRODUCT } from './types';

export const getAllProduct = () => async dispatch => {
    try {
        dispatch({
            type: SHOW_ALL_PRODUCT,
            payload: {
                data: [],
                loading: true,
            },
        });

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/products/index`
        );

        dispatch({
            type: SHOW_ALL_PRODUCT,
            payload: {
                data: response.data,
                loading: false,
            },
        });
    } catch (error) {
        dispatch({
            type: SHOW_ALL_PRODUCT,
            payload: {
                data: [],
                loading: false,
            },
        });

        console.log(error.response.data);
    }
};

export const getProduct = data => async dispatch => {
    try {
        dispatch({
            type: SHOW_PRODUCT,
            payload: {
                data: {},
                owner: {},
                loading: true,
            },
        });

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/products/show/${data}`
        );

        // Change city after response updated by backend team
        const owner = {
            name: response.data.username,
            city: response.data.city || 'Batam',
        };

        dispatch({
            type: SHOW_PRODUCT,
            payload: {
                data: response.data,
                owner: owner,
                loading: false,
            },
        });
    } catch (error) {
        dispatch({
            type: SHOW_PRODUCT,
            payload: {
                data: {},
                owner: {},
                loading: false,
            },
        });

        console.log('SHOW_PRODUCT' + error.response);
    }
};

export const searchProduct = (data, navigate) => async dispatch => {
    try {
        dispatch({
            type: SEARCH_PRODUCT,
            payload: {
                data: [],
                loading: true,
            },
        });

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/products?search=${data}`
        );

        dispatch({
            type: SEARCH_PRODUCT,
            payload: {
                data: response.data,
                loading: false,
            },
        });

        if (window.location.pathname === '/') return navigate('/search');
    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCT,
            payload: {
                data: [],
                loading: false,
            },
        });

        console.log(error.response.data);
    }
};
