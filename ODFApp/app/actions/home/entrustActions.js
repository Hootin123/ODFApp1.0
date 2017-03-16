/**
 * Created by pc on 2017/3/7.
 */
import * as types from '../actionTypes';
import C from '../../common/control'


import {Util,Local} from '../../common/utils';

export let getData = (productId)=> {

    return dispatch => {
        dispatch(fetchProData());
        Local.getItem('token', (token)=>{
            let URL = 'http://192.168.2.133:9090/odt-web/trade/product/getConfig.do?sid='+token;
            const data = {
                productId:productId,
            }
            return Util.post(URL, data, (response) => {
                dispatch(receiveProData(response))
            }, (error) => {
                dispatch(fetchProData());
            });
        })


    }
}

let fetchProData = ()=> {
    return {
        type: types.FETCH_PRODUCT_DATA,
    }
}

let receiveProData = (data) => {
    return {
        type: types.RECEIVE_PRODUCT_DATA,
        proCode:data.code,
        proData: data.data,
    }
}