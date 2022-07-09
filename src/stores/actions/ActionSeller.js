import axios from 'axios';
import {
    SHOW_ALL_SELLER_PRODUCT,
    SHOW_ALL_PRODUCT_BID,
    SELLER_ERROR,
} from './types';
import { setToken } from '../../utils/helper';

export const getSellerProduct = data => async dispatch => {
    try {
        dispatch({
            type: SHOW_ALL_SELLER_PRODUCT,
            payload: {
                loading: true,
            },
        });
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/products/${data}`
        );
        dispatch({
            type: SHOW_ALL_SELLER_PRODUCT,
            payload: {
                data: response.data,
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

export const getAllProductBid = data => async dispatch => {
    try {
        setToken(sessionStorage.getItem('token'));

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/bids/all-bids-product/${data}`
        );

        dispatch({
            type: SHOW_ALL_PRODUCT_BID,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: SELLER_ERROR,
            payload: error.response,
        });
    }
};
