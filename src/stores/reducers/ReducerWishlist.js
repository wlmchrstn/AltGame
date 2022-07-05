import {
    SHOW_ALL_WISHLIST,
    IS_IN_WISHLIST,
    ADD_WISHLIST,
    DELETE_WISHLIST,
    ERROR_WISHLIST,
} from '../actions/types';

const initialState = {
    wishlist: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SHOW_ALL_WISHLIST:
            return {
                ...state,
                ...payload,
                wishlist: payload,
            };
        case IS_IN_WISHLIST:
            return {
                ...state,
                ...payload,
            };
        case ADD_WISHLIST:
            return {
                ...state,
                ...payload,
            };
        case DELETE_WISHLIST:
            return {
                ...state,
                ...payload,
            };
        case ERROR_WISHLIST:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
};
