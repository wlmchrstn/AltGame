import {
    SHOW_ALL_SELLER_PRODUCT,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
} from '../actions/types';

const initialState = {
    listProducts: [],
    loading: false,
    buttonLoading: false,
    message: '',
    messageStatus: '',
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SHOW_ALL_SELLER_PRODUCT:
            return {
                ...state,
                listProducts: payload.data,
                loading: payload.loading,
            };
        case ADD_PRODUCT:
            return {
                ...state,
                buttonLoading: payload.loading,
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                buttonLoading: payload.loading,
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                buttonLoading: payload.loading,
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        default:
            return state;
    }
};
