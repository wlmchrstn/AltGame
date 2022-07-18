import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    GET_USER,
    UNAUTHENTICATED,
    UPDATE_USER,
    FAILED_UPDATE_USER,
} from '../actions/types';

const initialState = {
    token: sessionStorage.getItem('token'),
    user: {
        userId: null,
        name: '',
        city: '',
    },
    isAuthenticated: false,
    role: '',
    loading: false,
    error: '',
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            sessionStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: payload.loading,
                error: '',
            };
        case REGISTER_FAILED:
            sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: 'Failed to Register',
            };
        case LOGIN_SUCCESS:
            sessionStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: payload.loading,
                user: payload.user,
                error: '',
            };
        case LOGIN_FAIL:
            sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: 'Failed to Login',
            };
        case GET_USER:
            return {
                ...state,
                user: payload,
            };
        case UNAUTHENTICATED:
            sessionStorage.removeItem('token');
            return state;
        case UPDATE_USER:
            return {
                ...state,
                user: payload,
            };
        case FAILED_UPDATE_USER:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};
