import * as actionTypes from '../actions/actionTypes';
import { updatedObject} from './../utility';

const initialState = {
    ingredients : null,
    totalPrice:4,
    error:false,
    building: false
}

const INGREDIENT_PRICES = {
    salad:0.6,
    bacon: 0.8,
    meat:1.3,
    cheese:0.4
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        building: true,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedState)
}
const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updatedObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        building: true,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedSt)
}
const setIngredient = (state,action) => {
    return updatedObject(state , {
        ingredients: action.ingredients,
        totalPrice:4,
        error: false,
        building: false,
    });
}

const reducer = (state = initialState,action)=> {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);   
        case actionTypes.SET_INGREDIENT: return setIngredient(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updatedObject(state,{error: true});
        default: return state
    }
};

export default reducer;