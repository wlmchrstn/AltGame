import axios from 'axios';
import { SHOW_ALL_PRODUCT, SHOW_PRODUCT, PRODUCT_ERROR } from './types';

export const getAllProduct = () => async dispatch => {
    try {
        dispatch({
            type: SHOW_ALL_PRODUCT,
            payload: {
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
            payload: error.response,
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
            name: 'William',
            city: 'Batam',
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
            type: PRODUCT_ERROR,
            payload: error.response,
        });
    }
};
