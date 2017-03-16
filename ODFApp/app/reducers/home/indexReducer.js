/**
 * Created by pc on 2017/2/21.
 */
import * as types from '../../actions/actionTypes';

const initialState = {
    isLoading: false,
    bannerList:[],//banner图片
    proInfo:'',//code = 000000 代表成功
    proList:[],//产品列表
}

let indexReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_BANNER_HOME:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_BANNER_HOME:
            return Object.assign({}, state, {
                bannerList:action.bannerList,
                isLoading: false,
            })
        case types.FETCH_PRODUCT_LIST:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_PRODUCT_LIST:
            return Object.assign({}, state, {
                proInfo:action.proInfo,
                proList:action.proList,
            })
        default:
            return state
    }
}

export default indexReducer;
