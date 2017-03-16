/**
 * Created by pc on 2017/3/9.
 */
import * as types from '../../actions/actionTypes';

const initialState = {
    proCode:'',//code = 000000 代表成功
    proData:[],//数据
}

let accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCT_ACCOUNT:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_PRODUCT_ACCOUNT:
            return Object.assign({}, state, {
                proCode:action.proCode,
                proData:action.proData,
            })
        default:
            return state
    }
}

export default accountReducer;
