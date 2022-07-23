import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    GET_USER,
    UNAUTHENTICATED,
    UPDATE_USER,
    REGISTER_SELLER,
    LOGOUT,
} from '../actions/types';

const initialState = {
    token: sessionStorage.getItem('token'),
    user: {
        userId: null,
        name: '',
        username: '',
        city: '',
    },
    isAuthenticated: false,
    role: '',
    loading: false,
    buttonLoading: false,
    error: '',
    message: '',
    messageStatus: '',
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
                user: payload.data,
                loading: payload.loading,
            };
        case UNAUTHENTICATED:
            sessionStorage.removeItem('token');
            return state;
        case UPDATE_USER:
            return {
                ...state,
                buttonLoading: payload.loading,
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        case REGISTER_SELLER:
            return {
                ...state,
                buttonLoading: payload.loading,
                message: payload.message,
                messageStatus: payload.messageStatus,
            };
        case LOGOUT:
            sessionStorage.removeItem('token');
            return {
                state,
            };
        default:
            return state;
    }
};
