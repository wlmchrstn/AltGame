import axios from 'axios';
import {
    SHOW_ALL_SELLER_PRODUCT,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    UNAUTHENTICATED,
} from './types';
import { setToken } from '../../utils/helper';

export const getSellerProduct = navigate => async dispatch => {
    try {
        dispatch({
            type: SHOW_ALL_SELLER_PRODUCT,
            payload: {
                data: [],
                loading: true,
            },
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/products/my-products`
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
            type: SHOW_ALL_SELLER_PRODUCT,
            payload: {
                data: [],
                loading: false,
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

export const addSellerProduct =
    (data, create, notification, navigate, setRefresh) => async dispatch => {
        try {
            dispatch({
                type: ADD_PRODUCT,
                payload: {
                    loading: true,
                },
            });

            if (sessionStorage.getItem('token')) {
                setToken(sessionStorage.getItem('token'));
            }

            const { data: response } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/products/store`,
                data
            );

            dispatch({
                type: ADD_PRODUCT,
                payload: {
                    message: response.message || 'Produk berhasil ditambahkan',
                    messageStatus: 'success',
                    loading: false,
                },
            });

            create('landing');
            notification(true);
            setRefresh(prev => !prev);
        } catch (error) {
            if (error.response.status === 403) {
                dispatch({
                    type: UNAUTHENTICATED,
                });
                navigate('/login');
            }
            dispatch({
                type: ADD_PRODUCT,
                payload: {
                    message: error.response.data.message || 'Unexpected Error',
                    messageStatus: 'failed',
                    loading: false,
                },
            });
            create('landing');
            notification(true);
            setRefresh(prev => !prev);
        }
    };

export const updateSellerProduct =
    (id, data, navigate, modal, bid, notification, setRefresh) =>
    async dispatch => {
        try {
            dispatch({
                type: UPDATE_PRODUCT,
                payload: {
                    loading: true,
                },
            });

            if (sessionStorage.getItem('token')) {
                setToken(sessionStorage.getItem('token'));
            }

            const { data: response } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/products/update/${id}`,
                data
            );

            dispatch({
                type: UPDATE_PRODUCT,
                payload: {
                    message: response.message,
                    messageStatus: 'success',
                    loading: false,
                },
            });
            modal(false);
            bid('landing');
            notification(true);
            setRefresh(prev => !prev);
        } catch (error) {
            if (error.response.status === 403) {
                dispatch({
                    type: UNAUTHENTICATED,
                });
                navigate('/login');
            }
            dispatch({
                type: UPDATE_PRODUCT,
                payload: {
                    message: error.response.data.message || 'Unexpected Error',
                    messageStatus: 'failed',
                    loading: false,
                },
            });
            notification(true);
        }
    };

export const deleteSellerProduct =
    (data, navigate, bid, notification, setRefresh) => async dispatch => {
        try {
            dispatch({
                type: DELETE_PRODUCT,
                payload: {
                    loading: true,
                },
            });

            if (sessionStorage.getItem('token')) {
                setToken(sessionStorage.getItem('token'));
            }

            const { data: response } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/products/destroy/${data}`
            );

            dispatch({
                type: DELETE_PRODUCT,
                payload: {
                    message: response.message,
                    messageStatus: 'success',
                    loading: false,
                },
            });

            bid('landing');
            notification(true);
            setRefresh(prev => !prev);
        } catch (error) {
            if (error.response.status === 403) {
                dispatch({
                    type: UNAUTHENTICATED,
                });
                navigate('/login');
            }
            dispatch({
                type: DELETE_PRODUCT,
                payload: {
                    loading: false,
                    message: error.response.message,
                    messageStatus: 'failed',
                },
            });
        }
    };
