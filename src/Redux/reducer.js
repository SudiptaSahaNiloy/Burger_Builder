import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'cheese', amount: 0 },
        { type: 'meat', amount: 0 }
    ],
    orders: [],
    orderLoading: true,
    orderErr: false,
    totalPrice: 80,
    purchasable: false,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,
}

const INGREDIENT_PRICE = {
    salad: 20,
    cheese: 40,
    meat: 90
}

export const reducer = (state = INITIAL_STATE, action) => {
    const ingredients = [...state.ingredients];
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredients) { //iterates value of array
                if (item.type === action.payload) {
                    item.amount++;
                };
            };
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload],
            }

        case actionTypes.RESET_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    { type: 'salad', amount: 0 },
                    { type: 'cheese', amount: 0 },
                    { type: 'meat', amount: 0 }
                ],
                totalPrice: 80,
                purchasable: false,
            }

        case actionTypes.REMOVE_INGREDIENT:
            for (let item of ingredients) { //iterates value of array
                if (item.type === action.payload) {
                    if (item.amount !== 0)
                        item.amount--;
                    else
                        return state;
                };
            };
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload],
            };

        case actionTypes.UPDATE_PURCHASABLE:
            const sum = ingredients.reduce((sum, item) => {
                return sum + item.amount;
            }, 0)
            return {
                ...state,
                purchasable: sum > 0,
            }

        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key,
                });
            }
            return {
                ...state,
                orders: orders,
                orderLoading: false,
            }

        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderErr: true,
                orderLoading: false,
            }

        // Auth Cases
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                authFailedMsg: null,
                token: action.payload.token,
                userId: action.payload.userId,
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                authFailedMsg: null,
                userId: null,
            }

        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            }

        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload,
            }

        default:
            return state;
    }
}