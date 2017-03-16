/**
 * Created by pc on 2017/2/22.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    WebView,
    View,
} from 'react-native';

import C from '../../common/control';
import Header from '../../components/Header';

export default class LoanApp extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                {/*<Header*/}
                    {/*title={this.props.title}*/}
                    {/*style={{backgroundColor:C.colors.themeColor}}*/}
                    {/*leftIcon={require('../img/header_back.png')}*/}
                    {/*leftIconAction={() => {*/}
                        {/*this.props.navigator.pop()*/}
                    {/*}}*/}
                {/*/>*/}
                <WebView
                    // automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: 'http://dl4.dajiexin.com/news/info.html'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    webView:{flex:1,width:C.window.width}
});

