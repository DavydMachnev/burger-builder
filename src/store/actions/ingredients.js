import * as actionTypes from './actionTypes';
import axios from '../../axios/axiosOrders';

export const addIngredient = (name) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name
});

export const removeIngredient = (name) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name
});

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ingredients
});

export const initIngredientsFailed = () => ({
  type: actionTypes.INIT_INGREDIENTS_FAILED
});

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => dispatch(setIngredients(res.data)))
      .catch(_ => dispatch(initIngredientsFailed()));
  };
}