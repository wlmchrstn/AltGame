import {
    SHOW_ALL_SELLER_PRODUCT,
    SHOW_ALL_PRODUCT_BID,
    SELLER_ERROR,
} from '../actions/types';

const initialState = {
    listProducts: [],
    loading: true,
    error: '',
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
        case SHOW_ALL_PRODUCT_BID:
            return {
                ...state,
                listBids: payload,
            };
        case SELLER_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};
