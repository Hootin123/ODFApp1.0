/**
 * Created by pc on 2017/3/16.
 */

import React,{Component} from 'react';
import {
    View,
    Text,
    WebView,
    StyleSheet,
    Animated,
    Easing,
    DeviceEventEmitter,
    Platform,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import C from '../../common/control'
import Open from '../../common/open';
import {Util, Local} from '../../common/utils';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import Header from '../../components/Header';
import Root from '../../root';

export default class AssetsInfo extends Component{
    constructor(props){
        super(props);
        this.state={

        }

    }


    render(){
        return(
            <View style={styles.container}>
                <Header
                    style={{backgroundColor:C.colors.themeColor}}
                    leftIcon={require('../img/header_back.png')}
                    leftIconAction={() => {
                        this.props.navigator.pop()
                    }}
                    title={'用户反馈'}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.colors.bgColor,
        width:C.window.width,
    },
    topView:{
        height:120,
        backgroundColor:C.colors.themeColor,
        alignItems:'center'
    },
    peoplePic:{
        marginTop:15,
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:'#ccc',
        marginBottom:6,
    },
    text_b:{
        color:'#fff',
        fontSize:13,

    },
    listView:{
        height:56,
        backgroundColor:'#fff'
    },
    liststyle:{
        alignItems:'center',
        paddingLeft:20,
        marginBottom:6,
    },
    liststyle1:{
        marginBottom:60,
    },
    number:{
        flexDirection:'row'
    },
    flex:{
        flex:1
    },
    left:{
        borderRightColor:C.colors.bgColor,
        borderRightWidth:1,
    },
    common:{
        justifyContent:'center',
        alignItems:'center',
    },
    text_1:{
        fontSize:13,
        color:C.colors.themeColor,
        fontWeight:'bold',
    },
    text_2:{
        fontSize:13,
        color:'#8a9da4',
        marginTop:5,
    },
    text_c:{
        color:'#e71536',
        fontSize:13,
    },
    listColor:{
        backgroundColor:C.colors.bgColor,
    },
    litView:{
        width:C.window.width/2-30,
        height:30,
        backgroundColor: C.colors.themeColor,
        borderColor:C.colors.themeColor,
        borderWidth:1,
        borderRadius:3,
    },
    litView1:{
        width:C.window.width/2-30,
        height:30,
        borderColor:C.colors.themeColor,
        borderWidth:1,
        borderRadius:3,
    }
});

