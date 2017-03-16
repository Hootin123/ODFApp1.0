/**
 * Created by pc on 2017/2/20.
 */
import React from 'react';
import {
    TabBarIOS,
    View,
    Text,
    DeviceEventEmitter
} from 'react-native';

import TabBar from 'react-native-xtabbar';//IOS Androd 导航插件


import HomeContainer from './home/indexContainer';//首页
import LiveContainer from './live/indexContainer';//直播
import NewsContainer from './news/indexContainer';//资讯
import UserContainer from './user/indexContainer';//个人中心






const tabBarItems = [
    {title: '首页', icon: require('../pages/img/icon_01.png'),selectedIcon:require('../pages/img/icon_001.png'), component: HomeContainer},
    {title: '直播', icon: require('../pages/img/icon_02.png'),selectedIcon:require('../pages/img/icon_002.png'),  component: LiveContainer},
    {title: '资讯', icon: require('../pages/img/icon_03.png'),selectedIcon:require('../pages/img/icon_003.png'), component: NewsContainer},
    {title: '我的', icon: require('../pages/img/icon_04.png'),selectedIcon:require('../pages/img/icon_004.png'), component: UserContainer},
]

let index = 0;
export default class TabBarView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // selectedTab: tabBarItems[0].title,
        };
    }
    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('goHome',()=>{
        });
    }
    componentWillUnmount(){
        this.subscription.remove();
    }
    render(){
        return (
            <TabBar
                navTextColor={'#5e5653'}
                navTextColorSelected={'#ff5c5c'}
                navFontSize={12}
                defaultPage={0}

            >
                {
                    tabBarItems.map((controller, i) => {
                        let Component = controller.component;

                        return (
                            <TabBar.Item
                                title={controller.title}
                                icon={controller.icon}
                                selectedIcon={controller.selectedIcon}
                                style={{backgroundColor:'#f00'}}
                                 //badge={1}
                                 //point ={true} 变大
                                onPress={() => {
                                    if( i == '3'){
                                        DeviceEventEmitter.emit('refreshUser');
                                    }else if(i == '2'){
                                        DeviceEventEmitter.emit('refreshNews');
                                    } else if(i == '1'){
                                        DeviceEventEmitter.emit('refreshLive');
                                    }
                                }}>
                                <Component navigator = {this.props.navigator} {...this.props}/>
                            </TabBar.Item>
                        )
                    })
                }


            </TabBar>
        )

    }

}
