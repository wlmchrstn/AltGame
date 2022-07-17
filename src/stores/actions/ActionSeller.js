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

        setToken(sessionStorage.getItem('token'));

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
        console.log(error.response);
    }
};

export const addSellerProduct =
    (data, create, notification, navigate, refresh, setRefresh) =>
    async dispatch => {
        try {
            dispatch({
                type: ADD_PRODUCT,
                payload: {
                    loading: true,
                },
            });

            setToken(sessionStorage.getItem('token'));

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
            setRefresh(!refresh);
        } catch (error) {
            dispatch({
                payload: {
                    message: error.response.data.message || 'Unexpected Error',
                    messageStatus: 'failed',
                    loading: false,
                },
            });
            if (error.response.status === 403) {
                dispatch({
                    type: UNAUTHENTICATED,
                });
                navigate('/login');
            }
            console.log(error.response.data);
        }
    };

export const updateSellerProduct =
    (id, data, navigate, modal, notification, refresh, setRefresh) =>
    async dispatch => {
        try {
            dispatch({
                type: UPDATE_PRODUCT,
                payload: {
                    loading: true,
                },
            });

            setToken(sessionStorage.getItem('token'));

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
            notification(true);
            setRefresh(refresh);
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
            console.log(error.response.data);
        }
    };

export const deleteSellerProduct =
    (data, navigate, bid, notification, refresh, setRefresh) =>
    async dispatch => {
        try {
            dispatch({
                type: DELETE_PRODUCT,
                payload: {
                    loading: true,
                },
            });
            setToken(sessionStorage.getItem('token'));

            const { data: response } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/products/destroy/${data}`
            );

            console.log(response);

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
            console.log('before' + refresh);
            setRefresh(!refresh);
            console.log('after' + refresh);
        } catch (error) {
            console.log('error' + error);
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
