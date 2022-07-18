import {
    SHOW_ALL_BID,
    SHOW_BUYER_BID,
    ADD_BID,
    UPDATE_BID,
    DELETE_BID,
    ACCEPT_BID,
} from '../actions/types';

const initialState = {
    listBids: [],
    buyerBids: [],
    loading: false,
    buttonLoading: false,
    error: '',
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SHOW_ALL_BID:
            return {
                ...state,
                listBids: payload.data,
                loading: payload.loading,
            };
        case SHOW_BUYER_BID:
            return {
                ...state,
                buyerBids: payload.data,
                loading: payload.loading,
            };
        case ADD_BID:
            return {
                ...state,
                buttonLoading: payload.loading,
                error: payload.error,
            };
        case DELETE_BID:
            return {
                ...state,
                buttonLoading: payload.loading,
                error: payload.error,
            };
        case UPDATE_BID:
            return {
                ...state,
                buttonLoading: payload.loading,
                error: payload.error,
            };
        case ACCEPT_BID:
            return {
                ...state,
                buttonLoading: payload.loading,
                error: payload.error,
            };
        default:
            return state;
    }
};
