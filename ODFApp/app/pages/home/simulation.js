/**
 * Created by pc on 2017/2/6.
 */
/**
 * Created by pc on 2017/2/21.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    WebView,
    StyleSheet,
    ScrollView,
    Image,
    InteractionManager,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';
import {
    getOrder,
    getAmount
} from '../../actions/home/simulationActions';
import C from '../../common/control'
import Open from '../../common/open';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import {Util, Local} from '../../common/utils';
export default class Simulation extends Component{
    constructor(props){
        super(props);
        this.state={
            data:'',
            money:0,
        }

    }
    componentWillMount() {
        InteractionManager.runAfterInteractions(()=>{
            const { dispatch} = this.props;
            dispatch(getOrder());
            dispatch(getAmount());
            Local.getItem('token', (token)=>{
                this.setState({token:token})
            })
        });

        this.subscription = DeviceEventEmitter.addListener('money',()=>{
            InteractionManager.runAfterInteractions(()=>{
                const { dispatch} = this.props;
                dispatch(getAmount());
            });
        });

    }
    componentWillUnmount(){
        this.subscription.remove();
    }
    // componentWillMount(){
    //
    //
    //
    // }
    render(){
        const {SimulationIndex, dispatch} = this.props;
        var money=this.state.money;
        if(SimulationIndex.proInfo == '000000'){
            proList = SimulationIndex.proList;
            var proList1=[],proList2=[],proList3=[],proList4=[];
            for (var i = 0; i < proList.length; i++) {
                if(i>=0&&i<3){
                    proList1.push(proList[i])
                }else if(i>=3&&i<6){
                    proList2.push(proList[i])

                }else if(i>=6&&i<9){
                    proList3.push(proList[i])
                }else{
                    proList4.push(proList[i])
                }

            }

        }
        if(SimulationIndex.proCode=='0'){
            money=SimulationIndex.proAmount;
        }

        return(
            <View style={styles.container}>
                <Header
                    style={{backgroundColor:C.colors.themeColor}}
                    leftIcon={require('../img/header_back.png')}
                    leftIconAction={() => {
                        this.props.navigator.pop()
                    }}
                    title={'模拟练习'}
                />
                {SimulationIndex.proInfo != '000000' ?
                    <Loading /> :
                    <ScrollView >
                        <View style={styles.topView}>
                            <View style={styles.topViewLeft}>
                                <Text style={styles.text_1}>可用金币</Text>
                                <Text style={styles.text_2}>{money}</Text>
                            </View>
                            <View>
                                <View style={styles.storeView}>
                                    <Text style={styles.text_3}>金币商城</Text>
                                </View>
                            </View>
                        </View>


                        <View style={styles.listView}>

                            {
                                proList1.map((item, index)=> {
                                    if (item.shortName == 'CL') {
                                        var IMG = require('./img/CL.png')
                                    } else if (item.shortName == 'GC') {
                                        var IMG = require('./img/GC.png')
                                    } else if (item.shortName == 'MHI') {
                                        var IMG = require('./img/MHI.png')
                                    } else if (item.shortName == 'HSI') {
                                        var IMG = require('./img/HSI.png')
                                    } else if (item.shortName == 'SL') {
                                        var IMG = require('./img/SL.png')
                                    } else if (item.shortName == 'GC') {
                                        var IMG = require('./img/GC.png')
                                    } else if (item.shortName == 'NE') {
                                        var IMG = require('./img/NE.png')
                                    } else if (item.shortName == 'NQ') {
                                        var IMG = require('./img/NQ.png')
                                    } else if (item.shortName == 'AD') {
                                        var IMG = require('./img/AD.png')
                                    } else if (item.shortName == 'CD') {
                                        var IMG = require('./img/CD.png')
                                    }
                                    return (

                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={[styles.list, styles.flex]}
                                            onPress={this._onPressItem.bind(this, {
                                                productId: item.productId,
                                                productName: item.productName,
                                                type: item.shortName,
                                            })}
                                        >
                                            <View>
                                                <Image style={styles.pic1} source={IMG}/>
                                            </View>
                                            <Text style={styles.text_1}>{item.productName}</Text>
                                            <Text style={styles.text_a}>{item.remark}</Text>


                                        </TouchableOpacity>

                                    )
                                })
                            }

                        </View>

                        <View style={styles.listView}>


                            {
                                proList2.map((item, index)=> {
                                    if (item.shortName == 'CL') {
                                        var IMG = require('./img/CL.png')
                                    } else if (item.shortName == 'GC') {
                                        var IMG = require('./img/GC.png')
                                    } else if (item.shortName == 'MHI') {
                                        var IMG = require('./img/MHI.png')
                                    } else if (item.shortName == 'HSI') {
                                        var IMG = require('./img/HSI.png')
                                    } else if (item.shortName == 'SL') {
                                        var IMG = require('./img/SL.png')
                                    } else if (item.shortName == 'GC') {
                                        var IMG = require('./img/GC.png')
                                    } else if (item.shortName == 'NE') {
                                        var IMG = require('./img/NE.png')
                                    } else if (item.shortName == 'NQ') {
                                        var IMG = require('./img/NQ.png')
                                    } else if (item.shortName == 'AD') {
                                        var IMG = require('./img/AD.png')
                                    } else if (item.shortName == 'CD') {
                                        var IMG = require('./img/CD.png')
                                    }
                                    return (

                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={[styles.list, styles.flex]}
                                            onPress={this._onPressItem.bind(this, {
                                                productId: item.productId,
                                                productName: item.productName,
                                                type: item.shortName,
                                            })}
                                        >
                                            <View >
                                                <Image style={styles.pic1} source={IMG}/>
                                            </View>
                                            <Text style={styles.text_1}>{item.productName}</Text>
                                            <Text style={styles.text_a}>{item.remark}</Text>


                                        </TouchableOpacity>

                                    )
                                })
                            }
                        </View>
                        <View style={styles.listView}>

                            {
                                proList3.map((item, index)=> {
                                    if (item.shortName == 'CL') {
                                        var IMG = require('./img/CL.png')
                                    } else if (item.shortName == 'GC') {
                                        var IMG = require('./img/GC.png')
                                    } else if (item.shortName == 'MHI') {
                                        var IMG = require('./img/MHI.png')
                                    } else if (item.shortName == 'HSI') {
                                        var IMG = require('./img/HSI.png')
                                    } else if (item.shortName == 'SL') {
                                        var IMG = require('./img/SL.png')
                                    } else if (item.shortName == 'GC') {
                                        var IMG = require('./img/GC.png')
                                    } else if (item.shortName == 'NE') {
                                        var IMG = require('./img/NE.png')
                                    } else if (item.shortName == 'NQ') {
                                        var IMG = require('./img/NQ.png')
                                    } else if (item.shortName == 'AD') {
                                        var IMG = require('./img/AD.png')
                                    } else if (item.shortName == 'CD') {
                                        var IMG = require('./img/CD.png')
                                    }
                                    return (

                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={[styles.list, styles.flex]}
                                            onPress={this._onPressItem.bind(this, {
                                                productId: item.productId,
                                                productName: item.productName,
                                                type: item.shortName,
                                            })}
                                        >
                                            <View >
                                                <Image style={styles.pic1} source={IMG}/>
                                            </View>
                                            <Text style={styles.text_1}>{item.productName}</Text>
                                            <Text style={styles.text_a}>{item.remark}</Text>


                                        </TouchableOpacity>

                                    )
                                })
                            }
                        </View>
                        <View style={styles.listView}>

                            {
                                proList4.map((item, index)=> {
                                    if (item.shortName == 'CL') {
                                        var IMG = require('./img/CL.png')
                                    } else if (item.shortName == 'GC') {
                                        var IMG = require('./img/GC.png')
                                    } else if (item.shortName == 'MHI') {
                                        var IMG = require('./img/MHI.png')
                                    } else if (item.shortName == 'HSI') {
                                        var IMG = require('./img/HSI.png')
                                    } else if (item.shortName == 'SL') {
                                        var IMG = require('./img/SL.png')
                                    } else if (item.shortName == 'GC') {
                                        var IMG = require('./img/GC.png')
                                    } else if (item.shortName == 'NE') {
                                        var IMG = require('./img/NE.png')
                                    } else if (item.shortName == 'NQ') {
                                        var IMG = require('./img/NQ.png')
                                    } else if (item.shortName == 'AD') {
                                        var IMG = require('./img/AD.png')
                                    } else if (item.shortName == 'CD') {
                                        var IMG = require('./img/CD.png')
                                    }
                                    return (

                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={[styles.list, styles.flex]}
                                            onPress={this._onPressItem.bind(this, {
                                                productId: item.productId,
                                                productName: item.productName,
                                                type: item.shortName,
                                            })}
                                        >
                                            <View>
                                                <Image style={styles.pic1} source={IMG}/>
                                            </View>
                                            <Text style={styles.text_1}>{item.productName}</Text>
                                            <Text style={styles.text_a}>{item.remark}</Text>


                                        </TouchableOpacity>

                                    )
                                })
                            }
                        </View>

                    </ScrollView>
                }
            </View>
        )
    }


    _onPressItem(data){
        Open.H5PageBack(this.props.navigator, '金币模拟-'+data.productName, C.uri + '/h5/home/proinfo/chart.html?productId=' + data.productId + '&productName=' + data.productName + '&sid='+ this.state.token, data.type)

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.colors.bgColor,
        width:C.window.width,
    },
    topView:{
        height:75,
        paddingLeft:20,
        paddingRight:20,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    flex:{

        width:C.window.width/3
    },
    topViewLeft:{
        // flexDirection:'row'
    },
    storeView:{
        width:72,
        height:30,
        borderRadius:3,
        backgroundColor: C.colors.themeColor,
        alignItems:'center',
        justifyContent:'center'
    },
    text_3:{
        color:'#fff',
        fontSize:14,
    },
    text_1:{
        color:'#333',
        fontSize:14,
    },
    text_2:{
        color:'#ff5c5c',
        fontSize:24,
        textAlign:'center',
        fontWeight:'bold'
    },
    styles_4:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    },
    text_a:{
        color:'#7b7a7a',
        fontSize:11,

    },
    listView:{
        height:90,
        marginBottom:10,
        flexDirection:'row',

    },
    list:{
        borderRightColor:C.colors.bgColor,
        borderRightWidth:1,
        alignItems:'center',
        paddingTop:5,
        backgroundColor:'#fff',

    },
    pic1:{
        width:36,
        height:36,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:3,
    },

});

