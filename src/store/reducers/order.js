import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    order: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState,action)=> {
    switch (action.type){
        case actionTypes.PURCHASE_INIT: return updatedObject(state,{purchased: false})
        case actionTypes.PURCHASE_BURGER_START: return updatedObject(state,{loading: true})
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return updatedObject(state,{
                loading: false,
                order: state.order.concat(newOrder),
                purchased: true
            })
        case actionTypes.PURCHASE_BURGER_FAIL: return updatedObject(state,{loading: false})
        case actionTypes.FETCH_ORDER_SUCCESS:
            return updatedObject(state,{
                order: action.order,
                loading: false,
            })
        case actionTypes.FETCH_ORDER_FAIL: return updatedObject(state,{loading: false})
        case actionTypes.FETCH_ORDER_START: return updatedObject(state,{loading: true})
        default:
            return state;
    }
}

export default reducer;