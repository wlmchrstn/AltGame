import { SHOW_ALL_PRODUCT, SHOW_PRODUCT } from '../actions/types';

const initialState = {
    listProducts: [],
    product: {},
    productOwner: {},
    loading: true,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SHOW_ALL_PRODUCT:
            return {
                ...state,
                listProducts: payload.data,
                loading: payload.loading,
            };
        case SHOW_PRODUCT:
            return {
                ...state,
                product: payload.data,
                productOwner: payload.owner,
                loading: payload.loading,
            };
        default:
            return state;
    }
};
