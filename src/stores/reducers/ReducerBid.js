import { ADD_BID, BID_FAIL } from '../actions/types';

const initialState = {
    bid: {},
    loading: false,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_BID:
            return {
                ...state,
                loading: payload.loading,
            };
        case BID_FAIL:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
