import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addIngredient = (igtype) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype,
    }
}

export const removeIngredient = (igtype) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype,
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}

export const resetIngredient = () => {
    return {
        type: actionTypes.RESET_INGREDIENT,
    }
}

export const loadOrders = (orders) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED,
    }
}

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://construct-burger-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=' + token + queryParams)
            .then(response => dispatch(loadOrders(response.data)))
            .catch(error => dispatch(orderLoadFailed()))
    }
}


