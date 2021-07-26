import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            useId: userId,
        }
    }
}

export const auth = (email, password, mode) => (dispatch) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }

    let authURL = null;
    const API_KEY = 'AIzaSyBuw-7rw65VGMcDTjEyrCIU2TIaw7XFb3I'

    if (mode === "Sign Up") {
        authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    } else {
        authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    }

    axios.post(authURL + API_KEY, authData)
        .then(response => {
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);

            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationTime', expirationTime);

            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}


export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            // logout
            dispatch(logOut());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    } else {
        //logout
        dispatch(logOut());
    }
}