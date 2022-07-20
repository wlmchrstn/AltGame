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

        const owner = {
            name: response.data.user.name,
            city: response.data.user.city,
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

        if (window.location.pathname === '/') return navigate('/search');
    }
};
