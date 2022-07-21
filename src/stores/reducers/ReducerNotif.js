import { SHOW_ALL_NOTIF, UPDATE_NOTIF } from '../actions/types';

const initialState = {
    listNotifs: [],
    loading: true,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SHOW_ALL_NOTIF:
            return {
                ...state,
                listNotifs: payload.data,
                loading: payload.loading,
            };
        case UPDATE_NOTIF:
            return {
                ...state,
            };
        default:
            return state;
    }
};
