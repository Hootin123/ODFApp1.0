/**
 * Created by pc on 2017/2/21.
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
    TouchableOpacity,
} from 'react-native';
import C from '../../common/control'
import Open from '../../common/open';
import {Util, Local} from '../../common/utils';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import Header from '../../components/Header';
import Root from '../../root';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            text:'您好，请先登录',
            text1:'登录',
            text2:'注册',
            loginOut:false,
            money:0,
        }

    }

    componentWillUnmount(){
        this.subscription.remove();
    }
    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('refreshUser',()=>{
            this.init();
        });
        this.init()
    }
    init(fn){
        Local.getItem('token', (token)=>{
            da={
                acctType:'v',
                // sid:token,
            }
            Util.post('http://192.168.2.133:9090/odt-web/acct/getAcctAmount.do?sid='+token,da,(data)=>{

                if(data.code=='0'){
                    this.setState({
                        money:data.data,
                        text:'已登录',
                        loginOut:true,
                        text1:'充值',
                        text2:'提现',
                    })
                }else{
                    // Toast(data.msg);
                }
            })
        })
    }
    outLogin(){
        Local.getItem('token', (token)=>{
            Util.post('http://192.168.2.133:9090/odt-web/user/logout.do?sid='+token,'',(data)=>{
                if(data.code != '0'){
                    return Toast(data.msg);
                }
                Local.setItem('token', '00000')//token 替换为000000
                Toast('退出成功');
                setTimeout(
                    () => {
                            DeviceEventEmitter.emit('refreshUser');
                            this.props.navigator.replace({
                                name: 'Root',
                                component: Root,
                            })
                    },
                    100
                );
            })
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Header
                    style={{backgroundColor:C.colors.themeColor}}

                    leftIconAction={() => {
                        this.props.navigator.pop()
                    }}
                    title={'我的'}
                    rightButton={this.state.loginOut?'退出':null}
                    rightButtonAction={this.outLogin.bind(this)}
                />
                <View style={styles.topView}>
                    <View style={styles.peoplePic}></View>
                    <Text style={styles.text_b}>{this.state.text}</Text>
                </View>
                <View style={[styles.listView,styles.number]}>
                    <View style={[styles.left,styles.flex,styles.common]}>
                        <Text style={styles.text_1}>0</Text>
                        <Text style={styles.text_2}>账户余额(元)</Text>
                    </View>
                    <View style={[styles.flex,styles.common]}>
                        <Text style={styles.text_1}>{this.state.money}</Text>
                        <Text style={styles.text_2}>我的金币</Text>
                    </View>
                </View>
                <View style={[styles.listView,styles.number,styles.listColor]}>
                    <View style={[styles.flex,styles.common]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this.state.text1=='登录'?()=>{Open.UIPage(this.props.navigator, '2')}:null}
                        >
                            <View style={[styles.litView,styles.common]}>
                                <Text style={styles.text_b}>{this.state.text1}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.flex,styles.common]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this.state.text2=='注册'?()=>{Open.UIPage(this.props.navigator, '3')}:null}
                        >
                            <View style={[styles.litView1,styles.common]}>
                                <Text style={styles.text_c}>{this.state.text2}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.listView,styles.number]}>
                </View>

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

