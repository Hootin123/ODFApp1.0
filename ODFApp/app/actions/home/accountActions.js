/**
 * Created by pc on 2017/3/9.
 */
import * as types from '../actionTypes';
import C from '../../common/control'


import {Util,Local} from '../../common/utils';

export let getAccount = (productId)=> {

    return dispatch => {
        dispatch(fetchProAccount());
        Local.getItem('token', (token)=>{
            let URL = 'http://192.168.2.133:9090/odt-web/vr/trade/getUnPositions.do?sid='+token;
            const data = {
                productId:productId,
            }
            return Util.post(URL, data, (response) => {
                dispatch(receiveProAccount(response))
            }, (error) => {
                dispatch(fetchProAccount());
            });
        })


    }
}

let fetchProAccount = ()=> {
    return {
        type: types.FETCH_PRODUCT_ACCOUNT,
    }
}

let receiveProAccount = (data) => {
    return {
        type: types.RECEIVE_PRODUCT_ACCOUNT,
        proCode:data.code,
        proData: data.data,
    }
}