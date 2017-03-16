/**
 * Created by pc on 2017/2/21.
 */
import {
    AsyncStorage,
    Platform,
    NativeModules,
    DeviceEventEmitter
} from 'react-native';
export let Util = {
    /*
     * fetch简单封装
     * url: 请求的URL
     * successCallback: 请求成功回调
     * failCallback: 请求失败回调
     *
     * */
    get: (url, successCallback, failCallback) => {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch((err) => {
                failCallback(err);
            });
    },
    post: (url, data, successCallback, failCallback) => {
        let formData = new FormData();
        let token = ''
        for(let n in data){
            if(n == 'token'){
                token = data[n]
            }
            formData.append(n, data[n]);
        }
        let options = {};
        options.headers = {
            'Content-Type': 'multipart/form-data',
            'token': token,

            'Access-Control-Allow-Origin':'*',

        }
        options.body = formData;
        options.method = 'POST';
        fetch(url, options)
            .then((response) => response.text())
            .then((response) => {
                response = JSON.parse(response)
                successCallback(response)
            })
            .catch((err) => {
                if(!!failCallback){
                    failCallback(err)
                }
            });
    },
}


export let Local = {
    setItem: (key, value) => {
        const jsonValue = JSON.stringify(value);
        return AsyncStorage.setItem(key, jsonValue, (error) => {
            console.log(key + ' setOrRemoveObject error: ' + error);
        });
    },

    getItem: (key, callback) => {
        AsyncStorage.getItem(key)
            .then((data, error) => {
                typeof callback == 'function' && callback(JSON.parse(data))
            })
    },

    clearItem: (key) => {
        return AsyncStorage.removeItem(key);
    },
}
