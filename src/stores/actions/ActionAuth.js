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
    FAILED_UPDATE_USER,
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
                type: UNAUTHENTICATED,
            });
        }
    }
};

export const updateUser =
    (data, loading, notification, failedNotification) => async dispatch => {
        try {
            if (sessionStorage.getItem('token')) {
                setToken(sessionStorage.getItem('token'));
            }
            const { data: response } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/users/update`,
                data
            );
            dispatch({
                type: UPDATE_USER,
                payload: response.data,
            });
            notification(true);
            loading(false);
        } catch (error) {
            dispatch({
                type: FAILED_UPDATE_USER,
                payload: 'Failed to update user',
            });
            failedNotification(true);
        }
    };
