import axios from 'axios';
import { SHOW_ALL_NOTIF, UPDATE_NOTIF, UNAUTHENTICATED } from './types';
import { setToken } from '../../utils/helper';

export const getAllNotif = (bell, navigate) => async dispatch => {
    try {
        dispatch({
            type: SHOW_ALL_NOTIF,
            payload: {
                data: [],
                loading: true,
            },
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/notifications/show-user-notifications`
        );

        const newBell = response.data.filter(item => {
            return item.status === 'unread';
        });

        if (newBell.length !== 0) {
            bell(true);
        } else {
            bell(false);
        }

        dispatch({
            type: SHOW_ALL_NOTIF,
            payload: {
                data: response.data,
                loading: false,
            },
        });
    } catch (error) {
        dispatch({
            type: SHOW_ALL_NOTIF,
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

export const updateNotif = (data, refresh, navigate) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_NOTIF,
        });

        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/notifications/update-status-to-read/${data}`
        );

        dispatch({
            type: UPDATE_NOTIF,
            payload: {
                data: response,
            },
        });
        refresh(prev => !prev);
        navigate('/transaction');
    } catch (error) {
        dispatch({
            type: UPDATE_NOTIF,
            payload: {
                data: [],
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
