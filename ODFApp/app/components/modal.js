/**
 * Created by pc on 2017/2/7.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableHighlight,
} from 'react-native';

import C from '../common/control'

export default class Modalo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            show:true,
        }
    }

    // // 取消modal
    // _setModalVisible() {
    //     let isShow = this.state.show;
    //     this.setState({
    //         show:!isShow,
    //     });
    // }
    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={this.state.show}
                    onShow={() => {}}
                    onRequestClose={() => {}} >
                    <View style={styles.modalStyle}>
                        <View style={styles.subView}>
                            <Text style={styles.contentText}>
                                {this.props.content}
                            </Text>
                            <View style={styles.horizontalLine} />
                            <View style={[styles.buttonView,styles.radio]}>
                                <TouchableHighlight underlayColor='transparent'
                                                    style={styles.buttonStyle}
                                                    onPress={this.props.cancelAction}
                                >

                                    <Text style={styles.buttonText}>{this.props.cancel}</Text>
                                </TouchableHighlight>

                                { this.props.confirm!= null?(
                                        <TouchableHighlight underlayColor='transparent'
                                                            style={[styles.buttonStyle,styles.verticalLine]}
                                                            onPress={this.props.confirmAction}
                                        >
                                            <Text style={styles.buttonText}>{this.props.confirm}</Text>
                                        </TouchableHighlight>


                                )


                                    :null

                                }

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    modalStyle: {
        // backgroundColor:'#ccc',
        alignItems: 'center',
        justifyContent:'center',
        flex:1,

    },
    // modal上子View的样式
    subView:{
        marginLeft:60,
        marginRight:60,
        backgroundColor:'#fff',
        alignSelf: 'stretch',
        justifyContent:'center',
        borderRadius: 5,


    },
    // 标题
    titleText:{
        marginTop:10,
        marginBottom:5,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    // 内容
    contentText:{
        margin:12,
        fontSize:14,
        textAlign:'center',
    },
    // 水平的分割线
    horizontalLine:{
        marginTop:5,
        height:0.5,
        backgroundColor:'#ccc',
    },
    // 按钮
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:C.colors.themeColor,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5,
    },
    buttonStyle:{
        flex:1,
        height:40,
        alignItems: 'center',
        justifyContent:'center',


    },
    radio:{

    },
    // 竖直的分割线
    verticalLine:{
        borderLeftColor:'#ccc',
        borderLeftWidth:0.5,
    },
    buttonText:{
        fontSize:13,
        color:'#fff',
        textAlign:'center',
    },
})