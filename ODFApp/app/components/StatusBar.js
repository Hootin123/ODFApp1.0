/**
 * Created by pc on 2017/2/21.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Platform,
} from 'react-native';
import C from '../common/control';

export default class StatusBarIOS extends React.Component {
    render() {
        return (
            <StatusBar
                backgroundColor={C.colors.themeColor}
                barStyle = {'light-content'}
            />
        )
    }
}

const styles = StyleSheet.create({
    statusBar: {
        height: 20,
        backgroundColor: C.colors.themeColor,
    }
})
