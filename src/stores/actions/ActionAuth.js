import axios from 'axios';
import { setToken } from '../../utils/helper';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    GET_USER,
    UNAUTHENTICATED,
    UPDATE_USER,
    REGISTER_SELLER,
    LOGOUT,
} from './types';

export const registerUser =
    (data, navigate, notification) => async dispatch => {
        try {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    loading: true,
                },
            });

            const { data: response } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/signup`,
                data
            );

            const bodyLogin = {
                username: data.username,
                password: data.password,
            };

            const { data: login } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/login`,
                bodyLogin
            );

            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    loading: false,
                    data: response.data,
                    user: login.data,
                    token: login.data.access_token,
                },
            });

            navigate('/', { replace: true });
        } catch (error) {
            dispatch({
                type: REGISTER_FAILED,
                payload: {
                    loading: false,
                    data: error.response,
                },
            });
            notification(true);
        }
    };

export const login = (data, navigate, notification) => async dispatch => {
    try {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                loading: true,
            },
        });

        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/login`,
            data
        );

        sessionStorage.setItem('name', response.data.user.name);
        sessionStorage.setItem('city', response.data.user.city);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: response.data.access_token,
                user: response.data.user,
                loading: false,
            },
        });

        navigate('/', { replace: true });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response,
        });

        notification(true);
    }
};

export const getUser = () => async dispatch => {
    try {
        dispatch({
            type: GET_USER,
            payload: {
                loading: true,
                data: {
                    userId: null,
                    name: '',
                    username: '',
                    city: '',
                },
            },
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/users/get-user`
        );

        dispatch({
            type: GET_USER,
            payload: {
                loading: false,
                data: response.data,
            },
        });
    } catch (error) {
        if (error.response.status === 403) {
            dispatch({
                type: GET_USER,
                payload: {
                    loading: false,
                    data: {
                        userId: null,
                        name: '',
                        username: '',
                        city: '',
                    },
                },
            });
            dispatch({
                type: UNAUTHENTICATED,
            });
        }
    }
};

export const updateUser =
    (data, image, notification, modal, refresh, navigate) => async dispatch => {
        try {
            dispatch({
                type: UPDATE_USER,
                payload: {
                    loading: true,
                    message: '',
                    messageStatus: '',
                },
            });

            if (sessionStorage.getItem('token')) {
                setToken(sessionStorage.getItem('token'));
            }

            const imageReq = new FormData();
            if (image?.length > 0) {
                imageReq.append('image', image[0]);
                const { data: response } = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/users/upload-image`,
                    imageReq
                );
                console.log(response.message);
            } else {
                console.log('skip image upload');
            }

            const { data: response } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/users/update`,
                data
            );

            dispatch({
                type: UPDATE_USER,
                payload: {
                    loading: false,
                    message: response.message || 'Berhasil update user',
                    messageStatus: 'success',
                },
            });
            notification(true);
            modal(false);
            refresh(prev => !prev);
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: UPDATE_USER,
                payload: {
                    loading: false,
                    message: error.response.data.message || 'Gagal update user',
                    messageStatus: 'failed',
                },
            });
            notification(true);

            if (error.response.status === 403) {
                dispatch({
                    type: UNAUTHENTICATED,
                });
                navigate('/login');
            }
        }
    };

export const registerSeller =
    (data, modal, notification, refresh, navigate) => async dispatch => {
        try {
            dispatch({
                type: REGISTER_SELLER,
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
                `${process.env.REACT_APP_BASE_URL}/api/users/register-seller`,
                data
            );

            dispatch({
                type: REGISTER_SELLER,
                payload: {
                    loading: false,
                    message: response.message,
                    messageStatus: 'success',
                },
            });

            modal(false);
            notification(true);
            refresh(prev => !prev);
        } catch (error) {
            if (error.response.status === 403) {
                dispatch({
                    type: UNAUTHENTICATED,
                });
                navigate('/login');
            }

            dispatch({
                type: REGISTER_SELLER,
                payload: {
                    loading: false,
                    message: error.response.data.message,
                    messageStatus: 'failed',
                },
            });
        }
    };

export const logout = navigate => async dispatch => {
    try {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/logout`
        );

        dispatch({
            type: LOGOUT,
            payload: {
                data: response,
            },
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('city');
        navigate('/login');
    } catch (error) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('city');
        navigate('/login');
    }
};
