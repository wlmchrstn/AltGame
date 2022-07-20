import {
    SHOW_ALL_BID,
    SHOW_BUYER_BID,
    ADD_BID,
    UPDATE_BID,
    DELETE_BID,
    ACCEPT_BID,
    PAY_BID,
    GET_INVOICE,
} from '../actions/types';

const initialState = {
    listBids: [],
    buyerBids: [],
    invoice: {},
    loading: false,
    buttonLoading: false,
    message: '',
    messageStatus: '',
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
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        case DELETE_BID:
            return {
                ...state,
                buttonLoading: payload.loading,
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        case UPDATE_BID:
            return {
                ...state,
                buttonLoading: payload.loading,
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        case ACCEPT_BID:
            return {
                ...state,
                buttonLoading: payload.loading,
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        case PAY_BID:
            return {
                ...state,
                buttonLoading: payload.loading,
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        case GET_INVOICE:
            return {
                ...state,
                loading: payload.loading,
                invoice: payload.data,
            };
        default:
            return state;
    }
};
