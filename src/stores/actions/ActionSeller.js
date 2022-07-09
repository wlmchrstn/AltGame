import axios from 'axios';
import { SHOW_ALL_SELLER_PRODUCT, SELLER_ERROR, ADD_PRODUCT } from './types';

export const getSellerProduct = data => async dispatch => {
    try {
        dispatch({
            type: SHOW_ALL_SELLER_PRODUCT,
            payload: {
                loading: true,
            },
        });

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/products/${data}`
        );
        dispatch({
            type: SHOW_ALL_SELLER_PRODUCT,
            payload: {
                data: response.data.products,
                loading: false,
            },
        });
    } catch (error) {
        dispatch({
            type: SELLER_ERROR,
            payload: error.response,
        });
    }
};

export const addProduct = data => async dispatch => {
    try {
        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/products/store`,
            data
        );
        dispatch({
            type: ADD_PRODUCT,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: SELLER_ERROR,
            payload: error.response,
        });
    }
};
