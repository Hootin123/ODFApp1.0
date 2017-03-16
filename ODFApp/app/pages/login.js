/**
 * Created by pc on 2017/2/7.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    WebView,
    Image,
    StyleSheet,
    TextInput,
    InteractionManager,
    DeviceEventEmitter,
    TouchableOpacity,
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
            mobile: '',
            password: ''

        }

    }
    goLogin(){
        if(!/^1[3|4|5|7|8|9]\d{9}/.test(this.state.mobile)){
            return Toast('手机号格式不正确');
        }
        if(this.state.password == ''){
            return Toast('请设置密码');
        }
        const data = {
            phoneNum:this.state.mobile,
            password:this.state.password
        }
        Util.post('http://192.168.2.133:9090/odt-web/user/login.do', data, (result)=>{
            if(result.code != '0'){
                return Toast(result.msg)
            }
            let token = result.data;
            Local.setItem('token', token)//token 缓存在本地
            // DeviceEventEmitter.emit('refreshUser');
            Toast('登陆成功')
            setTimeout(()=>{
                    this.props.navigator.push({
                        name: 'Root',
                        component:Root,
                });
            },100)
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Header
                    style={{backgroundColor:C.colors.themeColor,borderBottomWidth:1,borderBottomColor:'#eee'}}
                    styleRight={{fontSize:18,}}
                    leftIcon={require('./img/header_back.png')}
                    leftIconAction={() => {
                        this.props.navigator.pop()
                    }}
                    rightButton='注册'
                    rightButtonAction={() => {
                        Open.UIPage(this.props.navigator, '3')
                    }}
                    title={'登录'}
                />
                <View style={styles.main}>
                    <View style={[styles.login_sr, styles.space]}>
                        <View style={{justifyContent:'center'}}>
                            <Image style={styles.Pic} source={require('./img/phone.png')} />
                        </View>
                        <TextInput
                            style={styles.login_input}
                            placeholder={'请输入手机号'}
                            placeholderTextColor="#c6c6c6"
                            keyboardType='numeric'
                            maxLength={11}
                            underlineColorAndroid="transparent"
                            value={this.state.mobile}
                            onChangeText={(mobile) => {
                                mobile = mobile.replace(/\D/g, '');
                                this.setState({mobile});
                            }}
                        />
                    </View>
                    <View style={styles.login_sr}>
                        <View style={{justifyContent:'center'}}>
                            <Image style={styles.Pic} source={require('./img/pwd.png')} />
                        </View>
                        <TextInput
                            style={styles.login_input}
                            placeholder={'请输入登录密码'}
                            placeholderTextColor="#c6c6c6"
                            secureTextEntry={true}
                            password={true}
                            maxLength={100}
                            underlineColorAndroid="transparent"
                            value={this.state.password}
                            onChangeText={(password) => {
                                this.setState({password});
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={ ()=>{Open.UIPage(this.props.navigator, '9')}}
                    >
                        <Text style={{color:'#c6c6c6',marginTop:6,textAlign:'right',fontSize:15,marginRight:25,}}>忘记密码</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={this.goLogin.bind(this)}
                    >
                        <View style={[styles.btn, styles.btnLogin]}>
                            <Text style={[styles.txt, styles.txtLogin]}>登录</Text>
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
        backgroundColor: '#fff',
        width:C.window.width,
    },

    login_sr:{
        height:60,
        backgroundColor:'white',
        flexDirection:'row',
        marginLeft:25,
        marginRight:25,
        borderBottomColor:'#F0F0F0',
        borderBottomWidth:1,
    },
    main:{
        borderTopColor:C.colors.bgColor,
        borderTopWidth:6,
        paddingTop:10,
    },
    space:{
        marginTop:10,
        marginBottom:1
    },
    login_input:{
        flex:1,
        marginTop:10,
    },
    btn:{
        height:45,
        marginLeft:25,
        marginTop:40,
        marginRight:25,
        marginBottom:10,
        borderColor:C.colors.themeColor,
        borderWidth:1,
        // borderRadius:5,
        overflow:'hidden',
        justifyContent:'center',
    },
    btnLogin:{
        backgroundColor:C.colors.themeColor
    },
    btnRegister:{
        backgroundColor:'white'
    },
    txt:{fontSize:16,textAlign:'center'},
    txtLogin:{
        color:'#fff',
        fontWeight:'bold',

    },
    txtRegister:{
        color:'#a5a4a4',
        fontSize:13,
    },
    Pic:{
        width:15,
        height:22,
        marginTop:10,
        marginRight:6,
        marginLeft:10,

    },

    bottomView:{
        flexDirection:'row',
        marginLeft:15,
        marginRight:15,
        justifyContent:'space-between'
    }
});

