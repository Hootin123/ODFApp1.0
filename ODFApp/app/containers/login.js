/**
 * Created by pc on 2017/2/7.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Login from '../pages/login';

class LoginContainer extends Component {
    render() {
        return (
            <Login {...this.props} />
        )
    }
}

export default connect((state) => {
    const {LoginIndex} = state;
    return {
        LoginIndex
    }
})(LoginContainer);