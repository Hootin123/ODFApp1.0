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
    ScrollView,
    TextInput,
    Picker,
    TouchableOpacity,
} from 'react-native';
import C from '../../../common/control'
import Open from '../../../common/open';
import {Util, Local} from '../../../common/utils';
import Loading from '../../../components/Loading';
import Toast from '../../../components/Toast';
import Header from '../../../components/Header';
import Root from '../../../root';

export default class AddBank extends Component{
    constructor(props){
        super(props);
        this.state={
            codeText: '获取验证码',
            wite:60,
            stasus:false,
        }

    }
    _onNext(){
        var name =this.state.name;
        var idCode = this.state.idCode;
        if(!/^[\u4E00-\u9FA5]{2,6}$/.test(name)){
            return  Toast('姓名应为2-6位汉字!');
        };
        if(!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(idCode)){
            return  Toast('身份证号码不正确!');
        };

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

    render(){
        return(
            <View style={styles.container}>
                <Header
                    style={{backgroundColor:C.colors.themeColor}}
                    leftIcon={require('../../img/header_back.png')}
                    leftIconAction={() => {
                        this.props.navigator.pop()
                    }}
                    title={'身份认证'}
                />
                <View style={styles.list}>
                    <View style={styles.listLi}>
                        <View style={[styles.listLiView,styles.border]}>
                            <View style={{position:'relative',flexDirection: 'row'}}>
                                <View style={{justifyContent:'center'}}>

                                </View>
                                <TextInput
                                    ref="1"
                                    underlineColorAndroid="transparent"
                                    style={{height: 40, flex:1,marginLeft:10,color:'#000',marginTop:10,}}
                                    placeholder="请输入本人储蓄卡号"
                                    placeholderTextColor="#c6c6c6"
                                    keyboardType="numeric"
                                    onChangeText={(carCode) => this.setState({carCode})}
                                    value={this.state.carCode}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.listLi}>
                        <View style={[styles.listLiView,styles.border]}>
                            <View style={{position:'relative',flexDirection: 'row'}}>
                                <View style={{justifyContent:'center'}}>

                                </View>
                                <Picker
                                    prompt="请选择银行"
                                    style={{width:C.window.width-30,color:'#666'}}
                                    selectedValue={this.state.bank}
                                    onValueChange={(e) => this.setState({bank: e})}>
                                    <Picker.Item label="请选择" value="" style={{color:'#666'}} />
                                    <Picker.Item label="工商银行" value="工商银行" />
                                    <Picker.Item label="农业银行" value="农业银行" />
                                    <Picker.Item label="中国银行" value="中国银行" />
                                    <Picker.Item label="建设银行" value="建设银行" />
                                    <Picker.Item label="交通银行" value="交通银行" />
                                    <Picker.Item label="民生银行" value="民生银行" />
                                    <Picker.Item label="中信银行" value="中信银行" />
                                    <Picker.Item label="光大银行" value="光大银行" />
                                    <Picker.Item label="兴业银行" value="兴业银行" />
                                    <Picker.Item label="平安银行" value="平安银行" />
                                    <Picker.Item label="浦发银行" value="浦发银行" />
                                    <Picker.Item label="广发银行" value="广发银行" />
                                    <Picker.Item label="北京银行" value="北京银行" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={styles.listLi}>
                        <View style={[styles.listLiView,styles.border]}>
                            <View style={{position:'relative',flexDirection: 'row'}}>
                                <View style={{justifyContent:'center'}}>

                                </View>
                                <TextInput
                                    ref="1"
                                    underlineColorAndroid="transparent"
                                    style={{height: 40, flex:1,marginLeft:10,color:'#000',marginTop:10,}}
                                    placeholder="请输入11位手机号"
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

                </View>

                <View style={styles.listLast}>
                    <TouchableOpacity
                        activeOpacity={0.5}
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
    Pic_01:{
        width:22,
        height:15,
        marginTop:10,
        marginRight:15,
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
        paddingTop:20,

    },
    listLast: {
        width:C.window.width-50,
        backgroundColor:C.colors.themeColor,
        position:'relative',
        borderWidth:1,
        borderColor:'#F0F0F0',
        marginLeft :25,
        marginRight:25,
        marginTop:30,
        height:45,
    },
    listLi: {
        position:'relative'
    },
    listLiView: {
        // position:'relative',
        height:55,
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

    checkbox:{
        fontSize:16,
    },

});

