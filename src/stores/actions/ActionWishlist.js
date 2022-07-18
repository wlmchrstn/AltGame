import axios from 'axios';
import {
    SHOW_ALL_WISHLIST,
    IS_IN_WISHLIST,
    ADD_WISHLIST,
    DELETE_WISHLIST,
    ERROR_WISHLIST,
} from './types';

export const getAllWishlist = () => async dispatch => {
    try {
        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/wishlists/index`
        );

        dispatch({
            type: SHOW_ALL_WISHLIST,
            payload: response.data.wishlists,
        });
    } catch (error) {
        dispatch({
            type: ERROR_WISHLIST,
            payload: error.response,
        });
    }
};

export const isInWishlist = data => async dispatch => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/is-product-in-wishlist/${data.id}`
        );

        dispatch({
            type: IS_IN_WISHLIST,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            payload: error.response,
        });
    }
};

export const addWishlist = data => async dispatch => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/wishlists/`,
            data
        );

        dispatch({
            type: ADD_WISHLIST,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            payload: error.response,
        });
    }
};

export const deleteWishlist = data => async dispatch => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/wishlists/destroy`,
            data
        );

        dispatch({
            type: DELETE_WISHLIST,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            payload: error.response,
        });
    }
};
