/**
 * Created by pc on 2017/2/21.
 * 导航栏标题
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import C from '../common/control'


const top = Platform.OS === 'ios'? 20 :0;
const height = 40;
export default class Header extends React.Component {

    render() {

        let NavigationBar = [];
        if (this.props.title != undefined) {
            NavigationBar.push(
                <View style={styles.title_view}>
                    <Text key={'title'} style={[styles.title,this.props.styleTitle]}>{this.props.title}</Text>
                </View>
            )
        }

        // 左边图片按钮
        if (this.props.leftIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftIcon'}
                    activeOpacity={0.75}
                    style={styles.leftIcon}
                    onPress={this.props.leftIconAction}
                >
                    <Image style={{height:15, width: 15}} source={this.props.leftIcon}/>
                </TouchableOpacity>
            )
        }else{
            NavigationBar.push(
                <View></View>
            )
        }





        // 右边图片按钮
        if (this.props.rightIcon != undefined) {

            NavigationBar.push(
                <TouchableOpacity
                    key={'rightIcon'}
                    activeOpacity={0.75}
                    style={styles.rightIcon}
                    onPress={this.props.rightIconAction}
                >
                    <View style={{  alignItems:'flex-end' }}>
                        <Image style={{height: 20, width: 20}} source={this.props.rightIcon} />
                    </View>
                </TouchableOpacity>
            )
        }

        // 右边文字按钮
        if (this.props.rightButton != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightButton'}
                    activeOpacity={0.75}
                    style={styles.rightButton}
                    onPress={this.props.rightButtonAction}
                >
                    <Text style={[styles.buttonTitleFont,this.props.styleRight]}>{this.props.rightButton}</Text>
                </TouchableOpacity>
            )
        }
        /*
         // 自定义标题View
         if (this.props.titleView != undefined) {
         let Component = this.props.titleView;

         NavigationBar.push(
         <Component key={'titleView'}/>
         )
         }
         if (this.props.rightMenu != undefined) {
         NavigationBar.push(
         <TouchableOpacity
         key={'rightMenu'}
         activeOpacity={0.75}
         style={styles.rightMenu}
         onPress={this.props.rightMenuAction}
         >
         <Text style={{color: 'gray', fontSize: 12}}>{this.props.rightMenu}</Text>
         <Image source={{uri: 'ic_food_ordering'}} style={{width: 16, height: 16}}/>
         </TouchableOpacity>
         )
         }

         */
        return (
            <View style={[styles.navigationBarContainer, this.props.style]}>
                {NavigationBar}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    navigationBarContainer: {
        flexDirection: 'row',
        height: top + height,
        justifyContent:'space-between',
        overflow:'hidden'
    },
    title_view:{
        top: top,
        height: height,
        position:'absolute',
        width:C.window.width,
        justifyContent:'center',
    },
    title: {
        color:'white',
        // fontWeight:'bold',
        fontSize:18,
        textAlign:'center',
    },

    leftIcon: {
        top: top,
        height: height,
        width:70,
        paddingLeft:15,
        justifyContent:'center'
    },

    rightIcon: {
        top: top,
        height: height,
        width:70,
        paddingRight:15,
        right:0,
        justifyContent:'center'
    },

    rightButton: {
        top: top,
        height: height,
        width:70,
        paddingRight:15,
        alignItems:'flex-end',
        justifyContent:'center'
    },

    buttonTitleFont: {
        color: 'white',
        fontSize: 12,
    },

    rightMenu: {
        position: 'absolute',
        right: 10,
        height: height,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
})