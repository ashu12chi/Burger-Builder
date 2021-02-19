import * as actionTypes from '../actions/actionTypes';

const inititalState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = inititalState,action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                purchased: true,
                loading: false,
                order: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export default reducer;