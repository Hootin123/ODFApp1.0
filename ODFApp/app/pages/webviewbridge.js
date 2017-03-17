/**
 * Created by pc on 2017/2/22.
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    Platform,
    Text,
    View,
    WebView,
    Alert,
    NativeModules: {
        WebViewBridgeManager,
        PayManager
    },
    DeviceEventEmitter,
} = ReactNative;
var WebViewBridge = require('react-native-webview-bridge');
import C from '../common/control';
import {Util, Local} from '../common/utils';
import Header from '../components/Header';
import Root from '../root';
import Loading from '../components/Loading';
import Open from '../common/open';

var Proinfo = React.createClass({
    onBridgeMessage: function (message) {
        const { webviewbridge } = this.refs;
        var message=JSON.parse(message)
        switch (message.Sign) {
            case "User":
                this.props.navigator.replace({
                    name: 'Root',
                    component: Root,
                })
                break;
            case "goBack":
                this.props.navigator.pop()
                break;
            case "goLogin":
                Open.UIPage(this.props.navigator, '2')
                break;
            case "Entrust":
                Open.UIPage(this.props.navigator, '4',{feed:{price:message.Data.price,type:message.Data.type, productId:message.Data.productId}})
                break;
            case "Account":
                Open.UIPage(this.props.navigator, '6',{feed:{productId:message.Data.productId,coinRate:message.Data.coinRate,minIncome:message.Data.minIncome,minChange:message.Data.minChange,askPrice:message.Data.askPrice,bidPrice:message.Data.bidPrice}})
                break;
            case "HoldPosition":
                Open.UIPage(this.props.navigator, '5',{feed:{productId:message.Data.productId,minIncome:message.Data.minIncome,minChange:message.Data.minChange,coinRate:message.Data.coinRate,stop:message.Data.stop,onlyProfit:message.Data.onlyProfit}})
                break;
            // case "freshenZC":
            //     DeviceEventEmitter.emit('changeAvatar');
            //     break;
            default:
            // this.props.navigator.replace({
            //     name: 'Root',
            //     component: Root,
            // })
        }
    },
    componentWillMount: function() {

            this.setState({show: true});
        var that=this;
        setTimeout(function () {
            that.setState({show: false});
        },500)

    },
    render: function() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.props.title}
                    style={{backgroundColor:C.colors.themeColor}}
                    leftIcon={require('./img/header_back.png')}
                    rightButton='玩法'
                    leftIconAction={() => {
                        this.props.navigator.pop()
                    }}
                    rightButtonAction={() => {
                        if(this.props.type=='CL'){
                            Open.H5Page(this.props.navigator,this.props.title+'玩法规则', C.uri+'/ODF/rule/rule00001.html')
                        } else if(this.props.type=='GC'){
                            Open.H5Page(this.props.navigator,this.props.title+'玩法规则', C.uri+'/ODF/rule/rule00002.html')
                        }else if(this.props.type=='SL'){
                            Open.H5Page(this.props.navigator,this.props.title+'玩法规则', C.uri+'/ODF/rule/rule00003.html')
                        }else if(this.props.type=='CL'){
                            Open.H5Page(this.props.navigator,this.props.title+'玩法规则', C.uri+'/ODF/rule/rule00001.html')
                        }else if(this.props.type=='HSI'){
                            Open.H5Page(this.props.navigator,this.props.title+'玩法规则', C.uri+'/ODF/rule/rule00004.html')
                        }else if(this.props.type=='MHI'){
                            Open.H5Page(this.props.navigator,this.props.title+'玩法规则', C.uri+'/ODF/rule/rule00007.html')
                        }else if(this.props.type=='NQ'){
                            Open.H5Page(this.props.navigator,this.props.title+'玩法规则', C.uri+'/ODF/rule/rule00006.html')
                        }else if(this.props.type=='AD'){
                            Open.H5Page(this.props.navigator,this.props.title+'玩法规则', C.uri+'/ODF/rule/rule00008.html')
                        }else if(this.props.type=='CD'){
                            Open.H5Page(this.props.navigator,this.props.title+'玩法规则', C.uri+'/ODF/rule/rule00009.html')
                        }else if(this.props.type=='NE'){
                            Open.H5Page(this.props.navigator,this.props.title+'玩法规则', C.uri+'/ODF/rule/rule00010.html')
                        }

                    }}
                />
                {/*{this.state.show? <Loading />:*/}

                <WebViewBridge
                    ref="webviewbridge"
                    onBridgeMessage={this.onBridgeMessage}
                    javaScriptEnabled={true}
                    source={{uri: this.props.url.indexOf('http') != '-1' ?this.props.url : 'http://'+this.props.url}}
                    />
                {/*}*/}

            </View>
        );
    }
});

module.exports = Proinfo;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
