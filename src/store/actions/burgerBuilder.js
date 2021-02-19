import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeInredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchInredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-91ac2-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchInredientsFailed());
        })
    };
}