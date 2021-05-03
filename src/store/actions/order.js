import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const prchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token) => {
    return dispatch=> {
        dispatch(prchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData).then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        }).catch(error => {
           dispatch(purchaseBurgerFail(error));
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order: orders
    }
}
export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderInit = (token,userId) => {
    
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json'+queryParams).then(response=>{
            const fetchedData = [];
            for(let key in response.data){
                fetchedData.push({
                    ...response.data[key],
                    id:key
                });
            }
            dispatch(fetchOrderSuccess(fetchedData))
        }).catch(error=>{
            dispatch(fetchOrderFail(error))
        })
    }
}