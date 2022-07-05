import { SHOW_ALL_SELLER_PRODUCT } from '../actions/types';

const initialState = {
    listProducts: [],
    loading: true,
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
        default:
            return state;
    }
};
