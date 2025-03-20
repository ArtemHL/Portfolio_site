import { LOGIN, LOGOUT } from './authActions';

const initialState = {
    isLogged: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLogged: true,
                email: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isLogged: false,
                email: null,
            };
        default:
            return state;
    }
};

export default authReducer;