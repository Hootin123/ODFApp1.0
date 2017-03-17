/**
 * Created by pc on 2017/2/21.
 */
/*
1.模拟交易,
2.登录,
3,注册,
4.委托,
5.持仓,
6,结算，
7.协议,
8.投资课堂,
9.忘记密码,
10.身份认证,
11.添加银行卡，
14.资金明细,
15,账户安全
16.修改登录密码
17.修改交易密码
18.用户反馈
19.充值,
20.提现
*/
import Login from '../containers/login';//登录
import Register from '../containers/register';//注册
import ForgetPwd from '../containers/forgetPwd'; // 忘记密码
import Simulation from '../containers/home/simulation';//模拟交易
import Entrust from '../containers/home/entrust'; // 委托
import HoldPosition from '../containers/home/holdPosition'; // 持仓
import Account from '../containers/home/account'; // 结算
import Protocol from '../containers/home/protocol'; // 协议
import ClassRoom from '../containers/home/classRoom'; // 投资课堂
import Identity from '../containers/user/identity/index';//身份认证
import AddBank from '../containers/user/identity/addBank';//身份认证
import AssetsInfo from '../containers/user/assetsInfo';//资金明细
import AccountSafe from '../containers/user/accountSafe/index';//账户安全
import UpdatePwd from '../containers/user/accountSafe/updatePwd';//修改登录密码
import UpdateTradersPwd from '../containers/user/accountSafe/updateTradersPwd';//修改交易密码
import UserBack from '../containers/user/userBack';//用户反馈
import RollIn from '../containers/user/rollIn';//充值
import RollOut from '../containers/user/rollOut';//提现


import Webview from '../pages/webview';
import Webviewbridge from '../pages/webviewbridge';
let Open = {
    UIPage: (navigator, str, passProps)=>{
        component = '';
        name = ''
        switch(str){
            case '1':
                component = Simulation;
                name = 'Simulation'
                break;
            case '2':
                component = Login;
                name = 'Login'
                break;
            case '3':
                component = Register;
                name = 'Register'
                break;
            case '4':
                component = Entrust;
                name = 'Entrust'
                break;
            case '5':
                component = HoldPosition;
                name = 'HoldPosition'
                break;
            case '6':
                component = Account;
                name = 'Account'
                break;
            case '7':
                component = Protocol;
                name = 'Protocol'
                break;
            case '8':
                component = ClassRoom;
                name = 'ClassRoom'
                break;
            case '9':
                component = ForgetPwd;
                name = 'ForgetPwd'
                break;
            case '10':
                component = Identity;
                name = 'Identity'
                break;
            case '11':
                component = AddBank;
                name = 'AddBank'
                break;
            case '14':
                component = AssetsInfo;
                name = 'AssetsInfo'
                break;
            case '15':
                component = AccountSafe;
                name = 'AccountSafe'
                break;
            case '16':
                component = UpdatePwd;
                name = 'UpdatePwd'
                break;
            case '17':
                component = UpdateTradersPwd;
                name = 'UpdateTradersPwd'
                break;
            case '18':
                component = UserBack;
                name = 'UserBack'
                break;
            case '19':
                component = RollIn;
                name = 'RollIn'
                break;
            case '20':
                component = RollOut;
                name = 'RollOut'
                break;
            default :
                component = Login;


        }
        navigator.push({
            name: name,
            component: component,
            passProps: passProps|| {}

        })
    },
    H5Page: (navigator, title, url)=>{

            navigator.push({
                name: '',
                component: Webview,
                passProps:{
                    title:title,
                    url:url,
                }
            })


    },
    H5PageBack: (navigator, title, url,type)=>{
        navigator.push({
            name: '',
            component: Webviewbridge,
            passProps:{
                title:title,
                url:url,
                type:type,
            }
        })
    },
}
export default Open;

