import {
    SHOW_ALL_WISHLIST,
    IS_IN_WISHLIST,
    ADD_WISHLIST,
    DELETE_WISHLIST,
} from '../actions/types';

const initialState = {
    wishlist: [],
    isInWishlist: false,
    loading: false,
    buttonLoading: false,
    message: '',
    messageStatus: '',
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SHOW_ALL_WISHLIST:
            return {
                ...state,
                wishlist: payload.data,
                loading: payload.loading,
            };
        case IS_IN_WISHLIST:
            return {
                ...state,
                loading: payload.loading,
                isInWishlist: payload.isInWishlist,
            };
        case ADD_WISHLIST:
            return {
                ...state,
                ...payload,
            };
        case DELETE_WISHLIST:
            return {
                ...state,
                loading: payload.loading,
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        default:
            return state;
    }
};
