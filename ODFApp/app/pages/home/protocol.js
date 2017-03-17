/**
 * Created by pc on 2017/3/2.
 */

import React,{Component} from 'react';
import {
    View,
    Text,
    WebView,
    StyleSheet,
    ScrollView,
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
                    title={'签署交易合作协议'}
                />

                <View style={styles.listView}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{Open.H5Page(this.props.navigator,'《投资人与用户交易合作协议》', C.uri+'/ODF/home/agreement.html?rnd='+Math.random())}}
                    >
                        <Text style={styles.text_1}>《投资人与用户参与相关期货品种交易合作协议》</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{textAlign:'right',fontSize:13,color:'#333'}}>未签署</Text>
                    </View>

                </View>
                <View style={styles.listView}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{Open.H5Page(this.props.navigator,'《风险告知书》', C.uri+'/ODF/home/InformBook.html?rnd='+Math.random())}}
                    >
                        <Text style={styles.text_1}>《风险告知书》</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{textAlign:'right',fontSize:13,color:'#333'}}>未签署</Text>
                    </View>

                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.bottomBtn}
                    onPress={()=>{Open.H5PageBack(this.props.navigator,'美原油', C.uri+'/ODF/home/proinfo/chart.html','cl?rnd='+Math.random())}}
                >
                    <Text style={{color:'#fff',fontSize:16}}>我已经阅读并同意签署</Text>
                </TouchableOpacity>
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

    text_1:{
        color:'#07e',
        fontSize:12,
        marginBottom:4,
    },

    listView:{
        height:60,
        backgroundColor:'#fff',
        marginTop:10,
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,

    },
    bottomBtn:{
        position:'absolute',
        height:50,
        width:C.window.width,
        bottom:0,
        left:0,
        backgroundColor:'#da2f35',
        borderTopColor:'#eceaea',
        borderTopWidth:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'


    },
});

