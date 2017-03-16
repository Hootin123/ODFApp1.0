/**
 * Created by pc on 2017/2/21.
 */
import * as types from '../actionTypes';
import C from '../../common/control'


import {Util} from '../../common/utils';

export let fetchBanners = ()=> {
    let URL = C.uri+'/h5/home/banner.json?ran='+Math.random();

    return dispatch => {
        dispatch(fetchBannerList());

        Util.get(URL,  (response) => {
            dispatch(receiveBannerList(response));
        }, (error) => {
            dispatch(fetchBannerList());
        })
    }
}

let fetchBannerList = ()=> {
    return {
        type: types.FETCH_BANNER_HOME,
    }
}

let receiveBannerList = (bannerList) => {
    return {
        type: types.RECEIVE_BANNER_HOME,
        bannerList: bannerList,
    }
}


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
