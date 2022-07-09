import axios from 'axios';
import { GET_ALL_BUYER_BID, ADD_BID, BID_FAIL } from './types';
import { setToken } from '../../utils/helper';

export const getBuyerBid = data => async dispatch => {
    try {
        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/bids/show/${data}`
        );

        dispatch({
            type: GET_ALL_BUYER_BID,
            payload: response.data,
        });
    } catch (error) {
        console.log('getBuyerBidError', error.response);
    }
};

export const addBid = data => async dispatch => {
    try {
        dispatch({
            type: ADD_BID,
            payload: {
                loading: true,
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
            },
        });
    } catch (error) {
        dispatch({
            type: BID_FAIL,
            payload: error.response,
        });
    }
};
