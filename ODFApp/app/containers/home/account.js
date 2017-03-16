/**
 * Created by pc on 2017/2/8.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Account from '../../pages/home/account';

class AccountContainer extends Component {
    render() {
        return (
            <Account {...this.props} />
        )
    }
}

export default connect((state) => {
    const {AccountIndex} = state;
    return {
        AccountIndex
    }
})(AccountContainer);