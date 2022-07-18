import axios from 'axios';
import {
    SHOW_ALL_BID,
    SHOW_BUYER_BID,
    ADD_BID,
    UPDATE_BID,
    DELETE_BID,
    ACCEPT_BID,
    UNAUTHENTICATED,
} from './types';
import { setToken } from '../../utils/helper';

export const getAllBid = (data, navigate) => async dispatch => {
    try {
        dispatch({
            type: SHOW_ALL_BID,
            payload: {
                data: [],
                loading: true,
            },
        });

        setToken(sessionStorage.getItem('token'));

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/bids/all-bids-product/${data}`
        );

        dispatch({
            type: SHOW_ALL_BID,
            payload: {
                data: response.data,
                loading: false,
            },
        });
    } catch (error) {
        if (error.response.status === 404) {
            dispatch({
                type: SHOW_ALL_BID,
                payload: {
                    data: [],
                    loading: false,
                },
            });
        }

        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
            navigate('/login');
        }
    }
};

export const getBuyerBid = (navigate, id, tawar) => async dispatch => {
    try {
        dispatch({
            type: SHOW_BUYER_BID,
            payload: {
                data: [],
                loading: true,
            },
        });

        setToken(sessionStorage.getItem('token'));

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/bids/index`
        );

        dispatch({
            type: SHOW_BUYER_BID,
            payload: {
                data: response.data,
                loading: false,
            },
        });

        const bid = response.data.find(e => e.productId == id);
        if (bid) tawar(false);
    } catch (error) {
        if (error.response.status === 404) {
            dispatch({
                type: SHOW_BUYER_BID,
                payload: {
                    data: [],
                    loading: false,
                },
            });
        }

        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
            navigate('/login');
        }
    }
};

export const addBid =
    (data, notification, modal, navigate, refresh) => async dispatch => {
        try {
            dispatch({
                type: ADD_BID,
                payload: {
                    loading: true,
                    error: '',
                },
            });

            setToken(sessionStorage.getItem('token'));

            const { data: response } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/bids/store`,
                data
            );

            dispatch({
                type: ADD_BID,
                payload: {
                    loading: false,
                    data: response.data,
                    error: '',
                },
            });

            notification(true);
            modal(false);
            refresh(prev => !prev);
        } catch (error) {
            dispatch({
                type: ADD_BID,
                payload: {
                    loading: false,
                    error: error.response.data.message,
                },
            });

            if (error.response.status === 403) {
                dispatch({
                    type: UNAUTHENTICATED,
                });
                navigate('/login');
            }

            notification(false);
        }
    };

export const updateBid = (id, data, navigate) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_BID,
            payload: {
                loading: true,
                error: '',
            },
        });

        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/bids/update/${id}`,
            data
        );

        dispatch({
            type: UPDATE_BID,
            payload: {
                data: response.data,
                loading: false,
                error: '',
            },
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BID,
            payload: {
                loading: false,
                error: 'Failed to Update bid',
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

export const deleteBid = (data, navigate) => async dispatch => {
    try {
        dispatch({
            type: DELETE_BID,
            payload: {
                loading: true,
                error: '',
            },
        });

        setToken(sessionStorage.getItem('token'));

        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/bids/destroy/${data}`
        );

        dispatch({
            type: DELETE_BID,
            payload: {
                data: response.data,
                loading: false,
                error: '',
            },
        });
    } catch (error) {
        dispatch({
            type: DELETE_BID,
            payload: {
                loading: false,
                error: 'Failed to delete Bid',
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

export const acceptBid = (data, navigate) => async dispatch => {
    try {
        dispatch({
            type: ACCEPT_BID,
            payload: {
                loading: true,
                error: '',
            },
        });

        setToken(sessionStorage.getItem('token'));

        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/bids/accept-bid-buyer/${data}`
        );

        dispatch({
            type: ACCEPT_BID,
            payload: {
                data: response.data,
                loading: false,
                error: '',
            },
        });
    } catch (error) {
        dispatch({
            type: ACCEPT_BID,
            payload: {
                loading: false,
                error: 'Failed to accept bid',
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
