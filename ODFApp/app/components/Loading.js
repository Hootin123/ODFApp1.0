/**
 * Created by pc on 2017/2/21.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';

import C from '../common/control'

export default class Loading extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loading}>
                    <ActivityIndicator color="white"/>
                    <Text style={styles.loadingTitle}>加载中...</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        zIndex:2,
        position: 'absolute',
        top: 44,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height:C.window.height - 90,
    },
    loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})