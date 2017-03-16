/**
 * Created by pc on 2017/3/6.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    WebView,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';

import C from '../common/control'
import Open from '../common/open';
import {Util, Local} from '../common/utils';
import Header from '../components/Header';
import Toast from '../components/Toast';
import Root from '../root';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            phone: '',
            pwd: '',
            phoneCode:'',
            codeText: '获取验证码',
            wite:60,
            stasus:false,
            isShow:false,


        }

    }


    countDown(){
        this.interval=setInterval(() => {
            this.setState({ wite: this.state.wite-- });
            this.setState({ codeText: (this.state.wite--)+'秒',active:true,});
            if(this.state.wite == 0){
                clearInterval(this.interval);
                this.setState({ wite: 60, codeText: '重新获取',active:false});
                this.setState({stasus: !this.state.stasus})
            }
        },1000);
    }
    //手机验证码
    _getYzm(data){
        var phone = this.state.phone;
        var param = {
            phoneNum:data.phone
        }

        if(!/^1[3|4|5|7|8]\d{9}$/.test(phone)){
            return Toast('手机号输入不正确');

        }

        if(this.state.stasus == false){
            this.setState({stasus: !this.state.stasus})
            Util.post('http://192.168.2.133:9090/odt-web/user/sendMsg.do',param,(data)=>{
                if(data.code == '0'){
                    this.countDown();
                    Toast('验证码发送成功,请注意查收');
                }
            },(err)=>{
                Toast('网络请求失败');
            })
        }

    }

    _onPressNext(){
        var phone = this.state.phone;
        var pwd = this.state.pwd;

        var param={
            phoneNum:this.state.phone,
            password:this.state.pwd,
            checkCode:this.state.phoneCode,

        }
        if(!/^1[3|4|5|7|8]\d{9}$/.test(phone)){
            return Toast('手机号码有误,请重新输入!');
        }
        if(!this.state.phoneCode)return Toast('请输入手机验证码!');

        if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/.test(pwd)){
            return  Toast('您输入的密码有误，密码应为6~15位数字和字母组合!');
        }
        Util.post(' http://192.168.2.133:9090/odt-web/user/forgetPass.do',param,(data)=>{
            if(data.code != '0'){
               return Toast(data.msg);
            }else{
                Toast('修改成功!');
               Open.UIPage(this.props.navigator, '2')
            }


        },(err)=>{
            Toast('网络请求失败');
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Header
                    style={{backgroundColor:C.colors.themeColor,borderBottomWidth:1,borderBottomColor:'#eee'}}
                    leftIcon={require('./img/header_back.png')}
                    leftIconAction={() => {
                        this.props.navigator.pop()
                    }}
                    title={'忘记密码'}
                />
                <View style={styles.list}>
                    <View style={styles.listLi}>
                        <View style={[styles.listLiView,styles.border]}>
                            <View style={{position:'relative',flexDirection: 'row'}}>
                                <View style={{justifyContent:'center'}}>
                                    <Image style={styles.Pic} source={require('./img/phone.png')} />
                                </View>
                                <TextInput
                                    ref="1"
                                    underlineColorAndroid="transparent"
                                    style={{height: 40, flex:1,marginLeft:10,color:'#000',marginTop:10,}}
                                    placeholder="请输入手机号码"
                                    placeholderTextColor="#c6c6c6"
                                    keyboardType="numeric"
                                    maxLength={11}
                                    onChangeText={(phone) => this.setState({phone})}
                                    value={this.state.phone}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.listLi}>
                        <View style={[styles.listLiView,styles.border]}>
                            <View style={{position:'relative',flexDirection: 'row'}}>
                                <View style={{justifyContent:'center'}}>
                                    <Image style={styles.Pic} source={require('./img/code.png')} />
                                </View>
                                <TextInput
                                    ref="1"
                                    underlineColorAndroid="transparent"
                                    style={{height: 40, flex:1,marginLeft:10,color:'#000',marginTop:10,}}
                                    placeholder="请输入右侧验证码"
                                    placeholderTextColor="#c6c6c6"
                                    keyboardType="numeric"
                                    maxLength={6}
                                    onChangeText={(phoneCode) => this.setState({phoneCode})}
                                    value={this.state.phoneCode}
                                />
                                <TouchableOpacity activeOpacity={0.8}
                                                  onPress={this._getYzm.bind(this,{phone:this.state.phone})}
                                >
                                    <View style={styles.codeView}>
                                        <Text style={styles.codeText}>{this.state.codeText}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.listLi}>
                        <View style={[styles.listLiView,styles.border]}>
                            <View style={{position:'relative',flexDirection: 'row'}}>
                                <View style={{justifyContent:'center'}}>
                                    <Image style={styles.Pic} source={require('./img/pwd.png')} />
                                </View>
                                <TextInput
                                    ref="2"
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={true}
                                    style={{height: 40, flex:1,marginLeft:10,color:'#000',marginTop:10,}}
                                    placeholder="请输入新密码"
                                    placeholderTextColor="#c6c6c6"
                                    onChangeText={(pwd) => this.setState({pwd})}
                                    value={this.state.pwd}
                                />
                            </View>
                        </View>
                    </View>

                </View>

                <View style={styles.listLast}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this._onPressNext.bind(this)}
                    >
                        <View style={styles.listLiView1}>
                            <Text style={[styles.text,styles.button1]}>完成</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        width:C.window.width,
    },

    img: {
        marginTop:5,
        marginRight:5,
        width: 15,
        height: 15,
    },
    img1:{
        marginTop:11,
        width: 16,
        height: 22,
    },

    Pic:{
        width:15,
        height:22,
        marginTop:10,
        marginLeft:10,

    },
    text: {
        position:'relative',
        fontSize:17,  },
    text_a:{
        marginTop:10,
        width: 80,
    },
    list: {
        backgroundColor: '#fff',
        position:'relative',
        paddingLeft:25,
        borderTopColor:C.colors.bgColor,
        borderTopWidth:6,
        paddingTop:10,

    },
    listLast: {
        width:C.window.width-50,
        backgroundColor:C.colors.themeColor,
        position:'relative',
        borderWidth:1,
        borderColor:'#F0F0F0',
        marginLeft :25,
        marginRight:25,
        marginTop:40,
        height:45,
    },
    listLi: {
        position:'relative'
    },
    listLiView: {
        // position:'relative',
        height:60,
        justifyContent:'center',
        marginRight:25,
    },
    listLiView1:{
        position:'relative',
        justifyContent:'center',
        height:45,
    },
    border:{
        borderBottomWidth:1,
        borderColor:'#F0F0F0'
    },
    button1: {
        textAlign:'center',
        color:'#fff'
    },
    codeView:{
        width:80,
        height:26,
        backgroundColor:'#fff',
        borderRadius:4,
        marginTop:12,
        justifyContent:'center',
        alignItems:'center',
        marginRight:15,
    },
    codeText:{
        color:'#231815',
        fontSize:14,
        marginTop:10,
    },

});

