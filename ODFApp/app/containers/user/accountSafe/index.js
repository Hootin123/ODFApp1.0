/**
 * Created by pc on 2017/3/16.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import AccountSafe from '../../../pages/user/accountSafe/index';

class AccountSafeContainer extends Component {
    render() {
        return (
            <AccountSafe{...this.props} />
        )
    }
}

export default connect((state) => {
    const {AccountSafeIndex} = state;
    return {
        AccountSafeIndex
    }
})(AccountSafeContainer);
