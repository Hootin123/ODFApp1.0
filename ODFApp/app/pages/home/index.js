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
    Alert,
    Linking,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    fetchBanners,
    getOrder
} from '../../actions/home/indexActions';
import C from '../../common/control'
import Open from '../../common/open';
import Swiper from 'react-native-swiper';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import {Util, Local} from '../../common/utils';
var n=3
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            code:'1',
            text:'我来了',
            rotation: new Animated.Value(0),

        }

    }

    componentWillMount() {
        const { dispatch} = this.props;
        dispatch(fetchBanners());
        dispatch(getOrder());

    }
    componentDidMount() {
        Local.getItem('token', (token)=>{
            if(token == undefined || token == ''){
                Local.setItem('token', '00000')
            }
        })
        // this.startAnimation()

            // this.startAnimation()
        // setInterval(()=>{
        //     this.setState({
        //         text:'我来了'+n++,
        //     })
        // },5000)

    }
        startAnimation(){
            this.state.rotation.setValue(0);
            Animated.timing(this.state.rotation, {
                toValue: 1, // 目标值
                duration: 5000, // 动画时间
                easing: Easing.linear // 缓动函数
            }).start(()=>this.startAnimation());
        }

    render(){
        const {HomeIndex, dispatch} = this.props;


        if(HomeIndex.bannerList.length){
            bannerList = HomeIndex.bannerList
        }
        if(HomeIndex.proInfo == '000000'){
            proList = HomeIndex.proList;


        }

        return(
            <View style={styles.container}>
                <Header
                    style={{backgroundColor:C.colors.themeColor}}

                    leftIconAction={() => {
                        this.props.navigator.pop()
                    }}
                    title={'贵金属'}
                    rightButton='新手？'
                    rightButtonAction={() => {
                            Open.H5Page(this.props.navigator,'活动详情', C.uri+'/ODF/home/activityDetails.html?rnd='+Math.random())
                    }}
                />
                {HomeIndex.proInfo != '000000' ?
                    <Loading /> :
                    <ScrollView>
                        <View>
                            <Swiper removeClippedSubviews={false} showsButtons={false}
                                    height={C.window.width / 750 * 300}
                                    autoplay={true}
                                    activeDot={<View style={{
                                        backgroundColor: 'white',
                                        width: 8,
                                        height: 8,
                                        borderRadius: 4,
                                        marginLeft: 3,
                                        marginRight: 3
                                    }}/>}
                                    dot={<View style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 4,
                                        marginLeft: 3,
                                        marginRight: 3,
                                        borderWidth: 0.5,
                                        borderColor: 'white'
                                    }}/>}
                                    paginationStyle={{
                                        bottom: 5
                                    }}
                            >
                                {
                                    bannerList.map((item)=> {
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                            >
                                                <Image style={{width: C.window.width, height: C.window.width / 750 * 300}}
                                                       source={{uri: item.image_key}}/>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </Swiper>
                            {/*<View style={styles.info}>*/}
                                {/*<TouchableOpacity*/}
                                    {/*activeOpacity={0.8}*/}
                                    {/*onPress={()=>{Open.H5Page(this.props.navigator,'《证券期货交易风险提示》',C.uri+'/h5/home/risk.html')}}*/}
                                {/*>*/}
                                    {/*<Image style={styles.img}*/}
                                           {/*source={require('./img/fxts.png')}/>*/}
                                {/*</TouchableOpacity>*/}
                                {/*<View>*/}
                                    {/*<Animated.View*/}
                                        {/*style={[{*/}
                                            {/*left: this.state.rotation.interpolate({*/}
                                                {/*inputRange: [0,1],*/}
                                                {/*outputRange: [0,C.window.width-100]*/}
                                            {/*})*/}
                                        {/*}]}>*/}
                                        {/*<Text style={styles.text}>{this.state.text}</Text>*/}

                                    {/*</Animated.View>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                            <View style={styles.litView}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.flex}
                                    onPress={()=>{Open.UIPage(this.props.navigator, '1')}}
                                >
                                        <View style={styles.circled}>
                                            <Image style={styles.pic} source={require('./img/mn_jy.png')} />
                                        </View>
                                        <Text style={styles.text_a}>模拟交易</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.flex}
                                    onPress={()=>{Open.UIPage(this.props.navigator, '8')}}
                                >
                                    <View style={styles.circled}>
                                        <Image style={styles.pic} source={require('./img/tz_kt.png')} />
                                    </View>
                                    <Text style={styles.text_a}>投资课堂</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.flex}
                                    onPress={()=>{Open.UIPage(this.props.navigator, '7')}}
                                >
                                    <View style={styles.circled}>
                                        <Image style={styles.pic} source={require('./img/tg_zq.png')} />
                                    </View>
                                    <Text style={styles.text_a}>推广赚钱</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.titView}>
                            <Text style={styles.text_b}>100%交易所实盘交易,</Text>
                            <View>
                            {/*<Animated.View*/}
                            {/*style={[{*/}
                            {/*left: this.state.rotation.interpolate({*/}
                            {/*inputRange: [0,1],*/}
                            {/*outputRange: [0,C.window.width-150]*/}
                            {/*})*/}
                            {/*}]}>*/}
                            {/*<Text style={styles.text_b}>{this.state.text}</Text>*/}

                            {/*</Animated.View>*/}
                            </View>
                        </View>

                        <View style={styles.listView}>
                            <View style={styles.listTitle}>
                                <Text style={styles.text_c}>国际期货</Text>
                            </View>

                            {
                                proList.map((item,index)=> {

                                    if(item.shortName=='CL'){
                                        var IMG=require('./img/CL.png')
                                    }else if(item.shortName=='GC'){
                                        var IMG=require( './img/GC.png')
                                    }else if(item.shortName=='MHI'){
                                        var IMG=require( './img/MHI.png')
                                    }else if(item.shortName=='HSI'){
                                        var IMG=require( './img/HSI.png')
                                    }else if(item.shortName=='SL'){
                                        var IMG=require( './img/SL.png')
                                    }else if(item.shortName=='GC'){
                                        var IMG=require( './img/GC.png')
                                    }else if(item.shortName=='NE'){
                                        var IMG=require( './img/NE.png')
                                    }else if(item.shortName=='NQ'){
                                        var IMG=require( './img/NQ.png')
                                    }else if(item.shortName=='AD'){
                                        var IMG=require( './img/AD.png')
                                    }else if(item.shortName=='CD'){
                                        var IMG=require( './img/CD.png')
                                    }
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={1}
                                           >
                                            <View style={styles.listMian}>
                                                <View style={styles.number}>
                                                    <Image style={styles.pic1} source={IMG} />
                                                </View>
                                                <View style={styles.rightView}>
                                                    <View>
                                                        <Text style={styles.text_a}>{item.productName}</Text>
                                                        <Text style={styles.text_e}>{item.remark}</Text>
                                                    </View>
                                                    <View style={styles.number}>
                                                        <Text style={styles.text_d}>53.54  -0.54%</Text>
                                                        <Text style={styles.text_e}>{item.startTime}-{item.isNextDay==1?'次日':''}{item.closeTime}</Text>
                                                    </View>
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }


                        </View>
                        <View style={styles.linkView}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={()=>{Open.H5Page(this.props.navigator,'资金安全',C.uri+'/ODF/home/moneySafe.html?rnd='+Math.random())}}
                            >
                                <View style={styles.linkLit}>
                                    <Text style={styles.text_1}>资金安全</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={()=>{Open.H5Page(this.props.navigator,'风险告知',C.uri+'/ODF/home/riskInfor.html?rnd='+Math.random())}}
                            >
                                <View style={[styles.linkLit,styles.margin]}>
                                    <Text style={styles.text_1}>风险告知</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={()=>{Open.H5Page(this.props.navigator,'合作机构',C.uri+'/ODF/home/organization.html?rnd='+Math.random())}}
                            >
                                <View style={styles.linkLit}>
                                    <Text style={styles.text_1}>合作机构</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{marginTop:15,marginBottom:15,}}>
                            <Text style={{marginBottom:10,fontSize:11,color:'#aaa',textAlign:'center',}}>客服电话：0</Text>
                            <Text style={styles.text_3}>交易由纽约商品交易所及港交所实盘对接</Text>
                            <Text  style={styles.text_3}>合作伙伴: 平安保险|南华期货|芝加哥商品交易所|CME集团</Text>
                            <Text  style={styles.text_3}>香港交易所|新加坡交易所|欧洲期货交易所</Text>
                        </View>
                    </ScrollView>
                }

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
    webView:{
        width:C.window.width,
        flex: 1,
    },
    info:{
        paddingLeft:15,
        paddingRight:15,
        height:40,
        backgroundColor:'#fff',
        borderBottomColor: C.colors.bgColor,
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center',
    },
    flex:{
        flex:1,
        borderRightWidth:0.5,
        borderRightColor: C.colors.bgColor,
        alignItems:'center',
        height:70,
        justifyContent:'center'
    },
    img:{
        width:106,
        height:23,
    },
    litView:{
        height:82,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        marginTop:12,


    },
    circled:{
        alignItems:'center',
        justifyContent:'center'
    },
    text_a:{
        fontSize:15,
        color:'#000',
        marginBottom:2,
    },
    titView:{
        height:36,
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:0.5,
        borderTopWidth:0.5,
        backgroundColor:'#fff',
        borderTopColor:'#eee',
        marginBottom:12,
        flexDirection:'row',
        alignItems:'center',
    },
    text_b:{
        fontSize:13,
        color:'#5d8967',
    },
    listView:{

        backgroundColor:'#fff'
    },
    listTitle:{
        height:43,
        justifyContent:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:0.5,
        paddingLeft:15,
    },
    text_c:{
        color:'#5e5653',
        fontSize:14,
    },
    listMian:{
        height:60,
        // justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',

        paddingLeft:15,
        // paddingRight:15,
    },
    rightView:{
        width:C.window.width-51,
        height:60,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomColor:'#eee',
        borderBottomWidth:0.5,
        paddingLeft:10,
        paddingRight:15,
    },
    pic1:{
        width:36,
        height:36,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:3,
    },
    text_e:{
        fontSize:12,
        color:'#7b7a7a',
    },
    text_d:{
        fontSize:12,
        color:'#008702',
        marginBottom:4,
    },
    number:{
        alignItems:'center',
    },
    linkView:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center',
    },
    linkLit:{
        width:66,
        height:26,
        backgroundColor:'#c4cad8',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
    },
    text_1:{
        fontSize:12,
        color:'#fff',

    },
    margin:{
        marginLeft:10,
        marginRight:10,
    },
    text_3:{
        fontSize:11,
        color:'#aaa',
        textAlign:'center',
    },
    pic:{
        width:42,
        height:42,
    }




});

