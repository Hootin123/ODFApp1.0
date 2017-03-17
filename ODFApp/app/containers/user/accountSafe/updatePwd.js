/**
 * Created by pc on 2017/3/17.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import UpdatePwd from '../../../pages/user/accountSafe/updatePwd';

class UpdatePwdContainer extends Component {
    render() {
        return (
            <UpdatePwd{...this.props} />
        )
    }
}

export default connect((state) => {
    const {UpdatePwdIndex} = state;
    return {
        UpdatePwdIndex
    }
})(UpdatePwdContainer);
