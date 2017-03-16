/**
 * Created by pc on 2017/2/21.
 */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import App from './containers/app';
export default class Root extends Component{
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}