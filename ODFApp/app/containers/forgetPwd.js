/**
 * Created by pc on 2017/3/6.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import ForgetPwd from '../pages/forgetPwd';

class ForgetPwdContainer extends Component {
    render() {
        return (
            <ForgetPwd {...this.props} />
        )
    }
}

export default connect((state) => {
    const {ForgetPwdIndex} = state;
    return {
        ForgetPwdIndex
    }
})(ForgetPwdContainer);