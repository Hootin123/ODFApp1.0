/**
 * Created by pc on 2017/2/21.
 */
import {Dimensions} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

let colors = {
    themeColor: '#ff5c5c',
    bgColor:'#f7f8f8',
}
//webview 接口页面地址
// let uri = 'http://userfinance.shanghaicaiyi.com'
// let uriT = 'http://servicefinance.shanghaicaiyi.com'
let uri = 'http://userfinance.gs.9188.com'
let uriT = 'http://servicefinance.gs.9188.com'
export default {
    window: window,
    colors: colors,
    uri: uri,
    uriT:uriT,
}