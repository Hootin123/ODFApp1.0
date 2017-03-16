/**
 * Created by pc on 2017/3/3.
 */

import React,{Component} from 'react';
import {
    View,
    Text,
    WebView,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import C from '../../common/control'
import Open from '../../common/open';
import Loading from '../../components/Loading';
import Header from '../../components/Header'
export default class Simulation extends Component{
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
                    title={'投资者课堂'}
                />
                <ScrollView>
                    <View style={styles.topView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{Open.H5Page(this.props.navigator,'资讯详情',C.uri+'/h5/home/classRoom/roomA.html')}}
                        >
                            <View style={[styles.btn1,styles.bgColor1]}>
                                <Text style={styles.text_b}>基础知识</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{Open.H5Page(this.props.navigator,'资讯详情',C.uri+'/h5/home/classRoom/roomB.html')}}
                        >
                            <View style={[styles.btn1,styles.bgColor2]}>
                                <Text style={styles.text_b}>安全知识</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listMian}>
                        <Text style={styles.text_a}>交易宝典</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{Open.H5Page(this.props.navigator,'资讯详情',C.uri+'/h5/home/classRoom/room01.html')}}
                        >
                            <View style={styles.listView}>
                                <Image style={styles.img} source={require('./img/001.jpg')}   />
                                <Text style={styles.text_c}>期货交易四步走，走出入门窘境</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{Open.H5Page(this.props.navigator,'资讯详情',C.uri+'/h5/home/classRoom/room02.html')}}
                        >
                            <View style={styles.listView}>

                                <Image style={styles.img} source={require('./img/002.jpg')}   />
                                <Text style={styles.text_c}>【K线图专题】支撑位、压力位是什么意思？</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{Open.H5Page(this.props.navigator,'资讯详情',C.uri+'/h5/home/classRoom/room03.html')}}
                        >
                            <View style={styles.listView}>

                                <Image style={styles.img} source={require('./img/003.jpg')}   />
                                <Text style={styles.text_c}>【K线图专题】K线图中哪些信号需要警示？</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{Open.H5Page(this.props.navigator,'资讯详情',C.uri+'/h5/home/classRoom/room04.html')}}
                        >
                            <View style={styles.listView}>

                                <Image style={styles.img} source={require('./img/004.jpg')}   />
                                <Text style={styles.text_c}>【K线图专题】利用K线图看懂原油走势</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{Open.H5Page(this.props.navigator,'资讯详情',C.uri+'/h5/home/classRoom/room05.html')}}
                        >
                            <View style={styles.listView}>

                                <Image style={styles.img} source={require('./img/005.jpg')}   />
                                <Text style={styles.text_c}>超短线技巧——日内震荡如何做单？</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{Open.H5Page(this.props.navigator,'资讯详情',C.uri+'/h5/home/classRoom/room06.html')}}
                        >
                            <View style={styles.listView}>

                                <Image style={styles.img} source={require('./img/004.jpg')}   />
                                <Text style={styles.text_c}>原油投资技术分析有什么缺点？</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{Open.H5Page(this.props.navigator,'资讯详情',C.uri+'/h5/home/classRoom/room07.html')}}
                        >
                            <View style={styles.listView}>

                                <Image style={styles.img} source={require('./img/006.jpg')}   />
                                <Text style={styles.text_c}>原油投资如何控制、降低风险？</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{Open.H5Page(this.props.navigator,'资讯详情',C.uri+'/h5/home/classRoom/room08.html')}}
                        >
                            <View style={styles.listView}>

                                <Image style={styles.img} source={require('./img/007.jpg')}   />
                                <Text style={styles.text_c}>原油投资如何正确把握利润？</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        paddingLeft:15,
        paddingRight:15,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    btn1:{
        width:(C.window.width-50)/2,
        height:50,
        borderRadius:6,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'

    },
    bgColor1:{
        backgroundColor:'#e6b234'
    },
    bgColor2:{
        backgroundColor:'#0497dc'
    },
    flex:{
        flex:1,
    },
    text_b:{
        fontSize:17,
        color:'#fff',


    },
    text_a:{
        marginTop:5,
        marginBottom:5,
        paddingLeft:15,
    },

    listMian:{

        backgroundColor:'#fff'
    },
    listView:{
        height:60,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:C.colors.bgColor,
        paddingLeft:15,
        paddingRight:15,

    },
    img:{
        width:70,
        height:50,
        marginRight:6,
    },
    text_c:{
        fontSize:13,
        color:'#333'
    }


});

