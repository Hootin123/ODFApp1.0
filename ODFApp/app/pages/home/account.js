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
    TouchableOpacity,
    ListView,
    Image,
    RefreshControl,
    ActivityIndicator,
    InteractionManager,
} from 'react-native';
import {
    getAccount
} from '../../actions/home/accountActions';
import C from '../../common/control'
import Open from '../../common/open';
import Modalo from '../../components/modal';
import Header from '../../components/Header'
import Toast from '../../components/Toast';
import {Util, Local} from '../../common/utils';
import Loading from '../../components/Loading';

export default class Entrust extends Component{
    constructor(props){
        super(props);
        this.state={
            content:'',
            cancel:'',
            confirm:null,
            isShow:false,
            loading:false,

        }




    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            this.init()
        });


    }
    init(){
        Local.getItem('token', (token)=>{
            const {feed} = this.props;
            var da={
                productId:feed.productId,
            }
            Util.post('http://192.168.2.133:9090/odt-web/vr/trade/getUnPositions.do?sid='+token,da,(data)=>{
                if(data.code=='000000'){
                    var data1=data.data;
                    // var ArrDataStart=[];
                    // var ArrDataEnd=[];
                    // for (var i = 0; i < 4; i++) {
                    //     ArrDataStart.push(data1[i])
                    // }
                    // for (var i = 5; i < data1.length; i++) {
                    //     ArrDataEnd.push(data1[i])
                    // }
                    this.setState({
                        code: data.code,
                        data: data1,
                        // data2:ArrDataEnd,
                    })
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
            var  data=this.state.data;

        }


        return(
            <View style={styles.container}>
                <Header
                style={{backgroundColor: C.colors.themeColor}}
                leftIcon={require('../img/header_back.png')}
                leftIconAction={() => {
                    this.props.navigator.pop()
                }}
                title={'结算'}
            />
                {data == '' ? <Text style={styles.noneText}>暂无交易</Text>:null}
                {code!='000000'?
                <Loading /> :
                        <View>
                            <ScrollView >
                                <View style={{marginBottom:120}}>
                            {
                              data.map((item, index)=> {

                                  if(item.direction=='1'){
                                      var profit=((feed.bidPrice*10-item.purchasePrice*10)/10)*feed.minIncome/feed.minChange;
                                  }else{
                                      var profit=((item.purchasePrice*10-feed.askPrice*10)/10)*feed.minIncome/feed.minChange
                                  }

                                  return (
                                            < View style={styles.listView}>
                                                <View style={styles.listTitle}>
                                                    <Text style={item.direction=='1'?styles.text_a:styles.text_a01}>{item.direction=='1'?'买涨1手':'买跌1手'}</Text>
                                                    <Text style={profit>=0?styles.text_b:styles.text_b01}>{profit} <Text>({profit*item.coinRate}元)</Text></Text>
                                                </View>
                                                <View style={styles.listMian}>
                                                    <View>
                                                        <Text style={styles.text_c}>止盈{item.onlyProfit}美元</Text>
                                                        <Text style={[styles.text_c,styles.top]}>止损{item.stop}美元</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.text_c}>买入{item.purchasePrice}</Text>
                                                        <Text style={[styles.text_c,styles.top]}>平仓{item.direction=='1'?feed.bidPrice:feed.askPrice}</Text>
                                                    </View>

                                                    <View style={styles.btnView}>
                                                        <Text style={{color:'#fff'}}>结算成功</Text>
                                                    </View>

                                                </View>
                                                <View >
                                                    <Text style={styles.text_c}>平仓时间:  2017-03-02 09:51:21</Text>
                                                </View>
                                            </View>
                                        )
                                    })

                            }

                                    {/*<TouchableOpacity*/}
                                        {/*activeOpacity={0.8}*/}
                                        {/*onPress={this._getMore.bind(this)}*/}
                                    {/*>*/}
                                        {/*<View style={{marginLeft:20,height:40,width:C.window.width-40,backgroundColor:'#fff',marginTop:20,justifyContent:'center',alignItems:'center'}}>*/}
                                            {/*<Text style={{fontSize:14}}>获取更多</Text>*/}
                                        {/*</View>*/}
                                    {/*</TouchableOpacity>*/}
                                </View>

                                </ScrollView>


                            {
                                this.state.isShow?(
                                <Modalo
                                content={this.state.content}
                                cancel={this.state.cancel}
                                confirm={this.state.confirm}
                                cancelAction={()=> {
                                this.setState({
                                    isShow: false,
                                })
                            }}
                                />
                                ):null
                            }
                        </View>
                    }
                <View style={this.state.isShow?styles.mengban:null}></View>
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

    flex:{
        flex:1,
    },
    text_1:{
        color:'#54ba65',
        fontSize:24,
        fontWeight:'bold'
    },
    text_2:{
        color:'#666',
        fontSize:13,
        fontWeight:'normal'
    },
    listView:{
        marginTop:10,
        borderTopColor:'#ddd',
        borderTopWidth:1,
        paddingRight:20,
        paddingLeft:20,
        height:140,
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
        fontWeight:'bold',
    },
    text_b:{
        color:C.colors.themeColor,
        fontSize:16,
        fontWeight:'bold',
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
    listMian:{
        height:60,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    btnView:{
        width:71,
        height:30,
        backgroundColor:'#999',
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
    },
    text_c:{
        color:'#595757',
        fontSize:14,
    },
    top:{
        marginTop:6,
    },
    mengban:{
        zIndex:2,
        position: 'absolute',
        top: -20,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height:C.window.height+20,
        backgroundColor:'#000',
        opacity:0.3,
    },
    noneText:{
        textAlign:'center',
        fontSize:16,
        marginTop:20,
        color:'#333'
    }
});

