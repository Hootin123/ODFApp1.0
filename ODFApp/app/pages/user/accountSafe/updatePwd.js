/**
 * Created by pc on 2017/3/17.
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
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import C from '../../../common/control'
import Open from '../../../common/open';
import {Util, Local} from '../../../common/utils';
import Loading from '../../../components/Loading';
import Toast from '../../../components/Toast';
import Header from '../../../components/Header';
import Root from '../../../root';

export default class AccountSafe extends Component{
    constructor(props){
        super(props);
        this.state={
            password:'',
            newPwd:'',
            reNewPwd:'',


        }

    }

    onchange(){
        var password=this.state.password;
        var newPwd=this.state.newPwd;
        var reNewPwd=this.state.reNewPwd;
        if(!/^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{6,12}$/.test(newPwd)){
            return  Toast('您输入的密码有误，密码应为6-12位数字+字母或符号组合!');
        };
        if(!/^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{6,12}$/.test(reNewPwd)){
            return  Toast('您输入的密码有误，密码应为6-12位数字+字母或符号组合!');
        };
        if(newPwd!=reNewPwd){
            return  Toast('两次密码输入不一致!');
        };
        var fam={
            password:password,
            newPass:newPwd,
        };
        Local.getItem('token', (token)=>{
            Util.post('http://192.168.2.133:9090/odt-web/user/modifyPass.do?sid='+token,fam,(data)=>{
                if(data.code == '0'){
                    Toast('密码修改成功');
                    setTimeout(()=>{
                        this.props.navigator.popToTop()
                    },1000);
                }else{
                    return Toast(data.msg);
                }

            })
        })

    }
    render(){
        return(
            <View style={styles.container}>
                <Header
                    style={{backgroundColor:C.colors.themeColor}}
                    leftIcon={require('../../img/header_back.png')}
                    leftIconAction={() => {
                        this.props.navigator.pop()
                    }}
                    title={'修改登录密码'}
                />
                <View style={styles.main}>
                    <View style={[styles.login_sr, styles.space]}>
                        <View style={{justifyContent:'center'}}>
                            <Image style={styles.Pic} source={require('../../img/pwd.png')} />
                        </View>
                        <TextInput
                            style={styles.login_input}
                            placeholder={'请输入当前登录密码'}
                            placeholderTextColor="#c6c6c6"
                            password={true}
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            maxLength={100}
                            value={this.state.password}
                            onChangeText={(password) => {
                                this.setState({password});
                            }}
                        />
                    </View>
                    <View style={styles.login_sr}>
                        <View style={{justifyContent:'center'}}>
                            <Image style={styles.Pic} source={require('../../img/pwd.png')} />
                        </View>
                        <TextInput
                            style={styles.login_input}
                            placeholder={'请输入新的登录密码'}
                            placeholderTextColor="#c6c6c6"
                            secureTextEntry={true}
                            password={true}
                            maxLength={100}
                            underlineColorAndroid="transparent"
                            value={this.state.newPwd}
                            onChangeText={(newPwd) => {
                                this.setState({newPwd});
                            }}
                        />
                    </View>
                    <View style={styles.login_sr}>
                        <View style={{justifyContent:'center'}}>
                            <Image style={styles.Pic} source={require('../../img/pwd.png')} />
                        </View>
                        <TextInput
                            style={styles.login_input}
                            placeholder={'请确认新登录密码'}
                            placeholderTextColor="#c6c6c6"
                            secureTextEntry={true}
                            password={true}
                            maxLength={100}
                            underlineColorAndroid="transparent"
                            value={this.state.reNewPwd}
                            onChangeText={(reNewPwd) => {
                                this.setState({reNewPwd});
                            }}
                        />
                    </View>
                </View>

                <View>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={this.onchange.bind(this)}
                    >
                        <View style={[styles.btn, styles.btnLogin]}>
                            <Text style={[styles.txt, styles.txtLogin]}>确定</Text>
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

