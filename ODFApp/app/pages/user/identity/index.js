/**
 * Created by pc on 2017/3/16.
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
    TouchableOpacity,
} from 'react-native';
import C from '../../../common/control'
import Open from '../../../common/open';
import {Util, Local} from '../../../common/utils';
import Loading from '../../../components/Loading';
import Toast from '../../../components/Toast';
import Header from '../../../components/Header';
import Root from '../../../root';

export default class Identity extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            idCode:'',
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
        Open.UIPage(this.props.navigator, '11')
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
                <View style={styles.main}>
                    <View style={[styles.login_sr, styles.space]}>
                        <View style={{justifyContent:'center'}}>

                        </View>
                        <TextInput
                            style={styles.login_input}
                            placeholder={'请输入本人真实姓名'}
                            placeholderTextColor="#c6c6c6"
                            password={true}
                            underlineColorAndroid="transparent"
                            maxLength={100}
                            value={this.state.name}
                            onChangeText={(name) => {
                                this.setState({name});
                            }}
                        />
                    </View>
                    <View style={styles.login_sr}>
                        <View style={{justifyContent:'center'}}>

                        </View>
                        <TextInput
                            style={styles.login_input}
                            placeholder={'请输入本人真实身份证号码'}
                            placeholderTextColor="#c6c6c6"
                            maxLength={100}
                            underlineColorAndroid="transparent"
                            value={this.state.idCode}
                            onChangeText={(idCode) => {
                                this.setState({idCode});
                            }}
                        />
                    </View>
                </View>

                <View>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={this._onNext.bind(this)}

                    >
                        <View style={[styles.btn, styles.btnLogin]}>
                            <Text style={[styles.txt, styles.txtLogin]}>下一步</Text>
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

