/**
 * Created by pc on 2017/2/7.
 */

import React,{Component} from 'react';
import {
    View,
    Text,
    WebView,
    Alert,
    StyleSheet,
    TextInput,
    InteractionManager,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    Image,
    ScrollView,
    Platform,
} from 'react-native';
import {
    getData
} from '../../actions/home/entrustActions';

import C from '../../common/control'
import Open from '../../common/open';
import {Util, Local} from '../../common/utils';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Toast from '../../components/Toast';
import Modalo from '../../components/modal';
var arrData=[];
const top = Platform.OS === 'ios'? 20 :0;
const height = 40;
export default class Entrust extends Component{
    constructor(props){
        super(props);
        this.state={
        active:0,
        active1:0,
        active2:0,
        Value1:'',
        Value2:'',
        num:'',
        content:'',
        cancel:'',
        confirm:null,
        isShow:false,
        show:true,

        }

    }
    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            this. init()
        });

    }

    init(){
        const {feed} = this.props;
        Local.getItem('token', (token)=>{
            da={
                productId:feed.productId,
            }
            Util.post('http://192.168.2.133:9090/odt-web/trade/product/getConfig.do?sid='+token,da,(data)=>{

                if(data.code=='000000'){
                    var data1=data.data;
                    this.setState({
                        code:data.code,
                        data:data1,
                        profitPoints:data1.riskManages[0].profitPoints,
                        Value1:parseInt(data1.riskManages[0].lostPoint)+parseInt(data1.riskGuaranteeAmount),
                        Value2:data1.charge,
                        changeNum:data1.charge,
                        num:parseInt(data1.riskManages[0].lostPoint)+parseInt(data1.riskGuaranteeAmount),
                    })
                    arrData=[data1.purchaseAmount.split(';')[0],data1.riskManages[0].lostPoint,this.state.profitPoints[0]];
                }else{
                    Toast(data.msg);
                }
            })
        })



        var ws = new WebSocket("ws://192.168.2.179:8383/quotations");
        var xinT={
            "type":"5",
        }
        var postData={
            "type":"1",
            "data":{
                'stockType':feed.productId
            }
        }
        var postData=JSON.stringify(postData);
        var xinT=JSON.stringify(xinT);
        ws.onopen = function()
        {
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send(postData);
            // alert("数据发送中...");
        };
        var that=this;
        ws.onmessage = function (evt)
        {
            ws.send(xinT);
            var getData = JSON.parse(evt.data);
            // console.log("数据已接收...");
            if(getData.data!=undefined){

                var askPrice=getData.data.askPrice;
                var bidPrice=getData.data.bidPrice;
                var contractNo1 =getData.data.contractNo1;//产品号
                that.setState({
                   askPrice:askPrice,
                   bidPrice:bidPrice,
                   contractNo1:contractNo1
               })



            }
        };

        ws.onclose = function()
        {
            // 关闭 websocket
            alert("连接已关闭...");
        };
    }
    _onBuy(data){
        Local.getItem('token', (token)=>{
            var fam={
                productId:data.productId,
                purchasePrice:data.purchasePrice,
                onlyProfit:arrData[2],
                stop: arrData[1],
                direction:data.direction,
                counts: arrData[0],


            }
            Util.post('http://192.168.2.133:9090/odt-web/vr/trade/purchase.do?sid='+token,fam,(data1)=>{
                if(data1.code=='000000'){
                    if(data.data!=undefined &&data.data.FailNum !='0'){
                        this.setState({
                            isShow:true,
                            content: <Text>下单{parseInt(data.data.successNum)+parseInt(data.data.FailNum)}手,{data.data.successNum}手成功,{data.data.FailNum}手失败,失败原因：余额不足</Text> ,
                            cancel:'确认'
                        })
                    }
                    Open.UIPage(this.props.navigator, '5',{feed:{productId:data.productId,purchasePrice:data.purchasePrice,coinRate:data.coinRate,minChange:data.minChange,minIncome:data.minIncome}})
                }else{
                    Toast(data1.msg)

                }
            })
        })
    }
    render(){

        const {feed} = this.props;
        var code=this.state.code;
        var   lostPoint=[];

        if(code=='000000'){
            data2=this.state.data;
            var productName=data2.productName;
            var productId=data2.productId;
            var coinRate=data2.coinRate;
            var minChange=data2.minChange;
            var minIncome=data2.minIncome;
            var profitPoints= this.state.profitPoints;
            purchaseAmount=data2.purchaseAmount.split(';');
            for (var i = 0; i < data2.riskManages.length; i++) {
                 lostPoint.push(data2.riskManages[i].lostPoint)
            }

        }

        return(
            <View style={styles.container}>
                <Header
                    style={{backgroundColor:C.colors.themeColor}}
                    leftIcon={require('../img/header_back.png')}
                    leftIconAction={() => {
                        this.props.navigator.pop()
                    }}
                    title={'买入委托'}
                />
                {code!= '000000' ?
                    <Loading /> :
                    <View style={{flex: 1}}>
                        <View style={styles.mainView}>
                            <View style={styles.listView}>
                                <Text style={{color: '#333', fontSize: 14}}>{productName} <Text
                                    style={{color: '#999', fontSize: 11,}}>{feed.productId+this.state.contractNo1}</Text></Text>
                                <Text style={{color: '#999', fontSize: 11,}}>持仓至明天,凌晨5:58自动平仓</Text>
                            </View>
                            <View style={styles.listView}>
                                <Text style={styles.text_1}>交易数量</Text>
                                <View style={{flexDirection: 'row',}}>

                                    {

                                        purchaseAmount.map((item, index)=> {

                                            return (
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={this._onPressFeedItem.bind(this, {
                                                        number: item,
                                                        type: index
                                                    })}
                                                >
                                                    <View
                                                        style={index == this.state.active ? styles.litViewActive : styles.litView}>
                                                        <Text
                                                            style={index == this.state.active ? styles.text_2Active : styles.text_2}>{item}手</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.listView}>
                                <Text style={styles.text_1}>触发止损</Text>
                                <View style={{flexDirection: 'row',width:C.window.width-120,}}>
                                    <ScrollView
                                        horizontal={true}
                                        ref={(scrollView) => { _scrollView = scrollView; }}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                    {

                                        lostPoint.map((item, index)=> {

                                            return (
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={this._onPressFeedItem1.bind(this, {
                                                        number: item,
                                                        type: index
                                                    })}
                                                >
                                                    <View
                                                        style={index == this.state.active1 ? styles.litViewActive : styles.litView}>
                                                        <Text
                                                            style={index == this.state.active1 ? styles.text_2Active : styles.text_2}>${item}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                    </ScrollView>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={()=>{;_scrollView.scrollTo({x:C.window.width-120})}}
                                        style={styles.litView1}
                                    >
                                        <View >
                                            <Image style={{width:10,height:10,}} source={require('./img/lit.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.listView}>
                                <Text style={styles.text_1}>触发止盈</Text>
                                <View style={{flexDirection: 'row',width:C.window.width-120,}}>
                                    <ScrollView
                                        horizontal={true}
                                        ref={(scrollView) => { _scrollView1 = scrollView; }}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                    {
                                        profitPoints.map((item, index)=> {

                                            return (
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={this._onPressFeedItem2.bind(this, {
                                                        number: item,
                                                        type: index
                                                    })}
                                                >

                                                        <View
                                                            style={index == this.state.active2 ? styles.litViewActive : styles.litView}>
                                                            <Text
                                                                style={index == this.state.active2? styles.text_2Active : styles.text_2}>${item}</Text>
                                                        </View>

                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                    </ScrollView>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={()=>{;_scrollView1.scrollTo({x:C.window.width-120})}}
                                        style={styles.litView1}
                                    >
                                        <View >
                                            <Image style={{width:10,height:10,}} source={require('./img/lit.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.listView}>
                                <Text style={styles.text_1}>止损保证金(冻结)</Text>
                                <Text style={{color: '#555', fontSize: 14}}>${this.state.Value1}<Text
                                    style={styles.text_4}>(￥{(this.state.Value1 * coinRate).toFixed(2)})</Text></Text>
                            </View>
                            <View style={styles.listView}>
                                <Text style={styles.text_1}>交易综合费</Text>
                                <Text style={{color: '#555', fontSize: 14}}>${this.state.Value2}<Text
                                    style={styles.text_4}>(￥{(this.state.Value2 * coinRate).toFixed(2)})</Text></Text>
                            </View>
                        </View>
                        <View style={[styles.listView, styles.padding]}>
                            <Text style={styles.text_3}>汇率换算：1美元 = {coinRate}人民币</Text>
                        </View>
                        <View style={[styles.listView, styles.padding, styles.bgColor]}>
                            <Text style={styles.text_1}>合计支付</Text>
                            <Text style={{color: '#555', fontSize: 14}}>(${this.state.Value1 + this.state.Value2} )<Text
                                style={{
                                    color: C.colors.themeColor,
                                    fontSize: 15
                                }}>￥{((this.state.Value1 + this.state.Value2) * coinRate).toFixed(2)}</Text></Text>
                        </View>
                        <View style={styles.bottomBtn}>
                            <View style={styles.flex}>
                                <Text style={styles.text_1}>最新买入价</Text>
                                <Text style={{color: C.colors.themeColor, fontSize: 15}}>{feed.type == '1' ?this.state.askPrice :this.state.bidPrice}</Text>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.flex1, feed.type == '1' ? styles.right : styles.rightActive]}

                                onPress={this._onBuy.bind(this,{direction: feed.type,purchasePrice:feed.type == '1' ?this.state.askPrice :this.state.bidPrice,productId: productId,minChange:minChange,minIncome:minIncome,coinRate:coinRate,})}
                            >
                                <Text style={{color: '#fff', fontSize: 15,}}>{feed.type == '1' ? '确定买涨' : '确定买跌'}</Text>
                            </TouchableOpacity>


                        </View>

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
                }
                <View style={this.state.isShow?styles.mengban:null}></View>
                <View style={this.state.isShow?styles.mengban2:null}></View>
            </View>
        )

    }

    _onPressFeedItem(data){

        this.setState({
            active:data.type,
        })
        arrData.splice(0,1,data.number)
        this.setState({
            Value1:data.number*this.state.num,
            Value2:data.number*this.state.changeNum,

        })


    }
    _onPressFeedItem1(data){
        this.setState({
            active1:data.type,
        })
        arrData.splice(1,1,data.number);
        this.setState({
            num:parseInt(data2.riskManages[data.type].lostPoint)+parseInt(data2.riskGuaranteeAmount),
            Value1:(parseInt(data2.riskManages[data.type].lostPoint)+parseInt(data2.riskGuaranteeAmount))*arrData[0],
            profitPoints:data2.riskManages[data.type].profitPoints

        })
    }
    _onPressFeedItem2(data){
        this.setState({
            active2:data.type,
        })
        arrData.splice(2,1,data.number)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.colors.bgColor,
        width:C.window.width,
    },
    mainView:{
        borderTopColor:'#eceaea',
        borderBottomColor:'#eceaea',
        backgroundColor:'#fff',
        borderTopWidth:1,
        borderBottomWidth:1,
        paddingLeft:15,
        paddingRight:15,

        marginTop:10,
    },
    listView:{
        height:45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#eceaea',

    },
    text_1:{
        color:'#333',
        fontSize:14,
    },
    litView:{
        paddingTop:1,
        paddingBottom:1,
        paddingLeft:6,
        paddingRight:6,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:6,
        borderColor:C.colors.themeColor,
        borderWidth:1,


    },
    litView1:{
        // paddingTop:1,
        // paddingBottom:1,
        paddingLeft:3,
        paddingRight:3,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:4,
        borderColor:C.colors.themeColor,
        borderWidth:1,


    },
    litViewActive:{
        backgroundColor:C.colors.themeColor,
        paddingTop:1,
        paddingBottom:1,
        paddingLeft:6,
        paddingRight:6,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:6,
        borderColor:C.colors.themeColor,
        borderWidth:1,
    },
    text_2:{
        fontSize:12,
        color:C.colors.themeColor,
    },
    text_2Active:{
        fontSize:12,
        color:'#fff'
    },
    padding:{
        paddingLeft:15,
        paddingRight:15,
    },
    bgColor:{
        backgroundColor:'#fff'
    },
    bottomBtn:{
        position:'absolute',
        height:50,
        width:C.window.width,
        bottom:0,
        left:0,
        backgroundColor:'#fff',
        borderTopColor:'#eceaea',
        borderTopWidth:1,
        flexDirection:'row',


    },
    flex:{
        flex:2,
        alignItems:'center',
        justifyContent:'center',
    },
    flex1:{
        flex:3,
        alignItems:'center',
        justifyContent:'center',
    },
    right:{
        backgroundColor:C.colors.themeColor,

    },
    rightActive:{
        backgroundColor:'#54ba65',
    },
    text_3:{
        fontSize:13,
        color:'#444'
    },
    text_4:{
        fontSize:14,
        color:'#999'
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
});

