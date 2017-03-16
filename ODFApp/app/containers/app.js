/**
 * Created by pc on 2017/2/21.
 */
import React,{ Component} from 'react';
import {
    Navigator,
    View,
} from 'react-native';
import StatusBar from '../components/StatusBar';
import TabBarView from './TabBarView';
export default class App extends Component{

    render(){
        return(
            <View style={{flex:1}}>
                <StatusBar />
                <Navigator
                    initialRoute={{name:'TabBarView',component:TabBarView}}
                    configureScene={(route,routeStack)=>{
                        return  Navigator.SceneConfigs.PushFromRight;
                    }}
                    renderScene={(route,navigator)=>{
                        let Component=route.component
                        return(
                            <Component navigator = {navigator} route={route} {...route.passProps}/>
                        )
                    }}
                >

                </Navigator>
            </View>
        )
    }
}