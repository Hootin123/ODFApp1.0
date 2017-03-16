/**
 * Created by pc on 2017/2/8.
 */

import React,{Component} from 'react';
import {
    View,
    Text,
    WebView,
    Alert,
    StyleSheet,
    TextInput,
    ScrollView,
    Platform,
    TouchableOpacity,
    InteractionManager,
    DeviceEventEmitter,
} from 'react-native';

import C from '../../common/control'
import Open from '../../common/open';
import Modalo from '../../components/modal';
import Header from '../../components/Header';
import Toast from '../../components/Toast';
import {Util, Local} from '../../common/utils';
import Loading from '../../components/Loading';


const top = Platform.OS === 'ios'? 20 :0;
const height = 40;
export default class Entrust extends Component{
    constructor(props){
        super(props);
        this.state={
            content:'',
            cancel:'',
            confirm:null,
            isShow:false,

        }

    }
    //一键平仓
    _keyPosition(data){

        Local.getItem('token', (token)=>{
            const {feed} = this.props;
            var fam={
                dealPrice:data.dealPrice,
                isAll:'1',
                productId:feed.productId,

            }
            Util.post('http://192.168.2.133:9090/odt-web/vr/trade/sale.do?sid='+token,fam,(data)=>{
                if(data.code=='000000'){
                    this.setState({
                        isShow:true,
                        content: <Text><Text>【卖出委托提交完毕】</Text> <Text>共{parseInt(data.data.successNum)+parseInt(data.data.FailNum)}笔，成功{data.data.successNum}笔，失败{data.data.FailNum}笔</Text></Text> ,
                        cancel:'确认'
                    })
                    this.init()

                }else{
                    this.setState({
                        isShow:true,
                        content: data.msg ,
                        cancel:'确认'
                    })
                }
            })
        })


    }
    //平仓
    _closePosition(data){
        Local.getItem('token', (token)=>{
            const {feed} = this.props;
            var fam={
                positionId:data.positionId,
                dealPrice:data.dealPrice,
                isAll:'0',

        }

            Util.post('http://192.168.2.133:9090/odt-web/vr/trade/sale.do?sid='+token,fam,(data)=>{
                if(data.code=='000000'){
                    this.setState({
                        isShow:true,
                        content: '平仓成功' ,
                        cancel:'确认'
                    })
                    this.init()

                }else{
                    this.setState({
                        isShow:true,
                        content: data.msg ,
                        cancel:'确认'
                    })
                }
            })
        })

    }

    componentDidMount(){

        InteractionManager.runAfterInteractions(()=>{
            this.init()
        });

    }
    init(){
        DeviceEventEmitter.emit('money')
        Local.getItem('token', (token)=>{
            const {feed} = this.props;
            var da={
                productId:feed.productId,
            }
            Util.post('http://192.168.2.133:9090/odt-web/vr/trade/getProPositions.do?sid='+token,da,(data)=>{
                if(data.code=='000000'){
                    var data1=data.data;
                    this.setState({
                        data:data1,
                        code:data.code,
                    })

                    var ws = new WebSocket("ws://192.168.2.179:8383/quotations");
                    var xinT={
                        "type":"5",
                    }
                    var postData={
                        "type":"1",
                    }
                    var postData=JSON.stringify(postData);
                    var xinT=JSON.stringify(xinT);
                    ws.onopen = function()
                    {
                        // Web Socket 已连接上，使用 send() 方法发送数据
                        ws.send(postData);

                        alert("数据发送中...");
                    };
                    var that=this;
                    ws.onmessage = function (evt) {
                        ws.send(xinT);
                        var getData = JSON.parse(evt.data);
                        // console.log("数据已接收...");
                        if (getData.data != undefined) {
                            var nowPrice=getData.data.lastPrice;
                            var askPrice = getData.data.askPrice;
                            var bidPrice = getData.data.bidPrice;


                            var  allProfit1=[];
                            var result=0;
                            for (var i = 0; i < that.state.data.length; i++) {
                                if(that.state.data[i].direction=='1'){
                                    var allProfit=((bidPrice*10-that.state.data[i].purchasePrice*10)/10)*feed.minIncome/feed.minChange;

                                }else{
                                    var allProfit=((that.state.data[i].purchasePrice*10-askPrice*10)/10)*feed.minIncome/feed.minChange
                                }
                                allProfit1.push(allProfit)
                                result+=allProfit1[i]
                            }

                            that.setState({
                                askPrice: askPrice,
                                bidPrice: bidPrice,
                                nowPrice:nowPrice,
                                result:result,
                                allProfit:allProfit
                            })


                        }
                    }





                }else{
                    Toast(data.msg)
                }
            })
        })




    }
    render(){

        const {feed} = this.props;
        var code=this.state.code;


        if(code=='000000'){
            var data=this.state.data;

        }

        return(
            <View style={styles.container}>
                {code!= '000000' || this.state.result==undefined?
                    <Loading /> :
                        <View>
                            <Header
                                style={{backgroundColor:C.colors.themeColor}}
                                leftIcon={require('../img/header_back.png')}
                                leftIconAction={() => {
                                    this.props.navigator.pop()
                                }}
                                title={'持仓'}
                                rightButton='结算'
                                rightButtonAction={() => {
                                        Open.UIPage(this.props.navigator, '6',{feed:{ productId:feed.productId,askPrice:this.state.askPrice,bidPrice:this.state.bidPrice,minIncome:feed.minIncome,minChange:feed.minChange}})

                                }}
                            />

                            <ScrollView >
                                <View style={{marginBottom:120}}>
                                    {data == '' ? <Text style={styles.noneText}>暂无交易</Text> :
                                        <View style={styles.topView}>
                                            <View style={styles.flex}>
                                                <Text style={styles.text_2}>持仓总收益(美元)</Text>

                                                <Text
                                                    style={this.state.result < 0 ? styles.text_1 : styles.text_01}>{this.state.result}<Text
                                                    style={{
                                                        color: '#666',
                                                        fontSize: 14,
                                                    }}>({feed.coinRate * this.state.result}元)</Text></Text>


                                            </View>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={this._keyPosition.bind(this, {dealPrice: 53.5,})}
                                            >
                                                <View style={styles.rightView}>
                                                    <Text style={{color: '#fff',}}>一键平仓</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    }

                                    {
                                        data.map((item, index)=> {

                                            if(item.direction=='1'){
                                                var profit=((this.state.bidPrice*10-item.purchasePrice*10)/10)*feed.minIncome/feed.minChange;
                                            }else{
                                                var profit=((item.purchasePrice*10-this.state.askPrice*10)/10)*feed.minIncome/feed.minChange
                                            }


                                            return (
                                                <View style={styles.listView}>
                                                    <View style={styles.listTitle}>
                                                        <Text style={item.direction=='1'?styles.text_a:styles.text_a01}>{item.direction=='1'?'买涨1手':'买跌1手'}</Text>
                                                        <Text style={profit>=0?styles.text_b:styles.text_b01}>{profit} <Text>({profit*feed.coinRate}元)</Text></Text>
                                                </View>
                                                    <View style={styles.listMian}>
                                                        <View>
                                                            <Text style={styles.text_c}>止盈{item.onlyProfit}美元</Text>
                                                            <Text style={[styles.text_c,styles.top]}>止损{item.stop}美元</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.text_c}>买入{item.purchasePrice}</Text>
                                                            <Text style={[styles.text_c,styles.top]}>现价{item.direction=='1'?this.state.bidPrice:this.state.askPrice}</Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            onPress={this._closePosition.bind(this,{positionId:item.positionId,dealPrice:item.direction=='1'?this.state.bidPrice:this.state.askPrice,})}
                                                        >
                                                            <View style={styles.btnView}>
                                                                <Text style={{color:'#fff'}}>平仓</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }



                                    {
                                        this.state.isShow?(
                                            <Modalo
                                                content={this.state.content}
                                                cancel={this.state.cancel}
                                                confirm={this.state.confirm}
                                                cancelAction={()=>{
                                                    this.setState({
                                                        isShow:false,
                                                    })
                                                }}

                                            />
                                        ):null
                                    }
                                 </View>
                            </ScrollView>

                        </View>
                    }
                <View style={this.state.isShow?styles.mengban:null}></View>
                <View style={this.state.isShow?styles.mengban2:null}></View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.colors.bgColor,
        width:C.window.width,
        position:'relative'
    },
    topView:{
        height:70,
        backgroundColor:'#fff',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:15,
        paddingLeft:15,
        marginTop:10,

    },
    flex:{
        flex:1,
    },
    text_1:{
        color:'#54ba65',
        fontSize:27,
        fontWeight:'bold',
    },
    text_01:{
        color:C.colors.themeColor,
        fontSize:27,
        fontWeight:'bold'
    },
    text_2:{
        color:'#333',
        fontSize:14,
        fontWeight:'normal'
    },
    rightView:{
        width:71,
        height:30,
        borderColor:C.colors.themeColor,
        borderWidth:1,
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:C.colors.themeColor,
    },
    listView:{
        marginTop:10,
        borderTopColor:'#ddd',
        borderTopWidth:1,
        paddingRight:20,
        paddingLeft:20,
        height:120,
        backgroundColor:'#fff'
    },
    listTitle:{
        height:50,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    text_a:{
        color:C.colors.themeColor,
        fontSize:16,
        fontWeight:'bold'
    },
    text_a01:{
        color:'#54ba65',
        fontSize:16,
        fontWeight:'bold'
    },
    text_b01:{
        color:'#54ba65',
        fontSize:16,
        fontWeight:'bold'
    },
    text_b:{
        color:C.colors.themeColor,
        fontSize:16,
        fontWeight:'bold'
    },
    listMian:{
        height:70,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    btnView:{
        width:71,
        height:30,
        borderColor:C.colors.themeColor,
        borderWidth:1,
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:C.colors.themeColor,
    },
    text_c:{
        color:'#595757',
        fontSize:14,
        fontWeight:'normal'
    },
    top:{
        marginTop:6,
    },
    mengban:{
        zIndex:2,
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height:C.window.height+20,
        backgroundColor:'#000',
        opacity:0.3,
    },
    mengban2:{
        zIndex:2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height:height+top,
        backgroundColor:'#000',
        opacity:0,
    },
    noneText:{
        textAlign:'center',
        fontSize:16,
        marginTop:20,
        color:'#333'
    }
});

