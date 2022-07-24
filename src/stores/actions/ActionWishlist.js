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
            payload: {
                loading: true,
                data: [],
            },
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/wishlists/index`
        );

        dispatch({
            type: SHOW_ALL_WISHLIST,
            payload: {
                loading: false,
                data: response.data,
            },
        });
    } catch (error) {
        dispatch({
            type: SHOW_ALL_WISHLIST,
            payload: {
                loading: false,
                data: [],
            },
        });

        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
            if (window.location.pathname === '/wishlist') {
                navigate('/login');
            }
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

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/is-product-in-wishlist/${data}`
        );

        dispatch({
            type: IS_IN_WISHLIST,
            payload: {
                loading: false,
                isInWishlist: response.data.in_wishlist,
            },
        });
    } catch (error) {
        dispatch({
            type: IS_IN_WISHLIST,
            payload: {
                loading: false,
                isInWishlist: false,
            },
        });
        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
        }
    }
};

export const addWishlist =
    (data, notification, refresh, navigate) => async dispatch => {
        try {
            dispatch({
                type: ADD_WISHLIST,
                payload: {
                    loading: true,
                    message: '',
                    messageStatus: '',
                },
            });

            if (sessionStorage.getItem('token')) {
                setToken(sessionStorage.getItem('token'));
            }

            const { data: response } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/wishlists/store`,
                {
                    productId: data,
                }
            );

            dispatch({
                type: ADD_WISHLIST,
                payload: {
                    loading: false,
                    message:
                        response.data.message || 'Berhasil menambah wishlist',
                    messageStatus: 'success',
                },
            });
            notification(true);
            refresh(prev => !prev);
        } catch (error) {
            if (error.response.status === 403) {
                dispatch({
                    type: UNAUTHENTICATED,
                });
                navigate('/login');
            }
        }
    };

export const deleteWishlist =
    (data, notification, refresh, navigate) => async dispatch => {
        try {
            dispatch({
                type: DELETE_WISHLIST,
                payload: {
                    loading: true,
                    message: '',
                    messageStatus: '',
                },
            });

            if (sessionStorage.getItem('token')) {
                setToken(sessionStorage.getItem('token'));
            }

            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/wishlists/destroy`,
                {
                    wishlistId: data,
                }
            );

            dispatch({
                type: DELETE_WISHLIST,
                payload: {
                    loading: false,
                    message: response.message || 'Berhasil hapus wishlist',
                    messageStatus: 'success',
                },
            });
            notification(true);
            refresh(prev => !prev);
        } catch (error) {
            dispatch({
                type: DELETE_WISHLIST,
                payload: {
                    loading: false,
                    message:
                        error.response.data.message || 'Gagal hapus wishlist',
                    messageStatus: 'failed',
                },
            });
            if (error.response.status === 403) {
                dispatch({
                    type: UNAUTHENTICATED,
                });
                navigate('/login');
            }
        }
    };
