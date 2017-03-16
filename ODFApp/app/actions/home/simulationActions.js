/**
 * Created by pc on 2017/3/6.
 */
import * as types from '../actionTypes';
import C from '../../common/control'

import {Util,Local} from '../../common/utils';


export let getOrder = ()=> {
    let URL = 'http://192.168.2.133:9090/odt-web/trade/product/getProducts.do'
    return dispatch => {
        dispatch(fetchProList());

        return Util.post(URL, {token: ''}, (response) => {
            dispatch(receiveProList(response))
        }, (error) => {
            dispatch(fetchProList());
        });
    }
}

let fetchProList = ()=> {
    return {
        type: types.FETCH_PRODUCT_LIST,
    }
}

let receiveProList = (data) => {
    return {
        type: types.RECEIVE_PRODUCT_LIST,
        proInfo:data.code,
        proList: data.data,
    }
}


export let getAmount = ()=> {
    return dispatch => {
        dispatch(fetchProAmount());
        Local.getItem('token', (token)=>{
            let URL = 'http://192.168.2.133:9090/odt-web/acct/getAcctAmount.do?sid='+token;
            const data = {
                acctType:'v',
            }
            return Util.post(URL, data, (response) => {
                dispatch(receivProAmount(response))
            }, (error) => {
                dispatch(fetchProAmount());
            });
        })

    }
}

let fetchProAmount = ()=> {
    return {
        type: types.FETCH_PRODUCT_AMOUNT,
    }
}

let receivProAmount = (data) => {
    return {
        type: types.RECEIVE_PRODUCT_AMOUNT,
        proCode:data.code,
        proAmount: data.data,
    }
}