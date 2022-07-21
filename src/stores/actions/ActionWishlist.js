import axios from 'axios';
import { setToken } from '../../utils/helper';
import {
    SHOW_ALL_WISHLIST,
    IS_IN_WISHLIST,
    ADD_WISHLIST,
    DELETE_WISHLIST,
    UNAUTHENTICATED,
} from './types';

export const getAllWishlist = navigate => async dispatch => {
    try {
        dispatch({
            type: SHOW_ALL_WISHLIST,
            payload: { loading: true, data: [] },
        });
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }
        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/wishlists/index`
        );

        dispatch({
            type: SHOW_ALL_WISHLIST,
            payload: { loading: false, data: response.data },
        });
    } catch (error) {
        dispatch({
            type: SHOW_ALL_WISHLIST,
            payload: { loading: false, data: [] },
        });
        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
            navigate('/login');
        }
    }
};

export const isProductInWishlist = data => async dispatch => {
    try {
        dispatch({
            type: IS_IN_WISHLIST,
            payload: {
                loading: true,
                isInWishlist: false,
            },
        });
        setToken(sessionStorage.getItem('token'));
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/is-product-in-wishlist/${data}`
        );
        console.log(typeof response.data.data.in_wishlist);
        dispatch({
            type: IS_IN_WISHLIST,
            payload: {
                loading: false,
                isInWishlist: response.data.data.in_wishlist,
            },
        });
    } catch (error) {
        // dispatch({
        //     payload: error.response,
        // });
        console.log(error);
    }
};

export const addWishlist = data => async dispatch => {
    try {
        // axios
        //     .post(
        //         'https://api-altgame-production.herokuapp.com/api/wishlists/store',
        //         { productId: id }
        //     )
        //     .then(function (response) {
        //         console.log(response);
        //     });
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/wishlists/store`,
            {
                productId: data,
            }
        );
        console.log(response.data);

        // const response = await axios.post(
        //     `${process.env.REACT_APP_BASE_URL}/api/wishlists/`,
        //     data
        // );

        dispatch({
            type: ADD_WISHLIST,
            payload: response.data,
        });
    } catch (error) {
        // dispatch({
        //     payload: error.response,
        // });
        console.log(error);
    }
};

export const deleteWishlist = data => async dispatch => {
    try {
        dispatch({
            type: DELETE_WISHLIST,
            payload: { loading: true },
        });
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/wishlists/destroy`,
            { wishlistId: data }
        );

        dispatch({
            type: DELETE_WISHLIST,
            payload: { loading: false, data: response },
        });
    } catch (error) {
        dispatch({
            type: DELETE_WISHLIST,
            payload: { loading: false },
        });
    }
};
