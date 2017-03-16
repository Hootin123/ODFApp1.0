/**
 * Created by pc on 2017/3/6.
 */
import * as types from '../../actions/actionTypes';

const initialState = {
    proInfo:'',//code = 000000 代表成功
    proList:[],//产品列表
    proCode:'',
    proAmount:''
}

let simulationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCT_LIST:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_PRODUCT_LIST:
            return Object.assign({}, state, {
                proInfo:action.proInfo,
                proList:action.proList,
            })
        case types.FETCH_PRODUCT_AMOUNT:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_PRODUCT_AMOUNT:
            return Object.assign({}, state, {
                proCode:action.proCode,
                proAmount:action.proAmount,
            })
        default:
            return state
    }
}

export default simulationReducer;
