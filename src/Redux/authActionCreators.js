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
            dispatch(authSuccess(response.data.idToken, response.data.loadId))
        })
}