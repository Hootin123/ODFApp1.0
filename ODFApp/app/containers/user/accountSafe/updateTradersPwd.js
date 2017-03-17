/**
 * Created by pc on 2017/3/17.
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import UpdateTradersPwd from '../../../pages/user/accountSafe/updateTradersPwd';

class UpdateTradersPwdContainer extends Component {
    render() {
        return (
            <UpdateTradersPwd{...this.props} />
        )
    }
}

export default connect((state) => {
    const {UpdateTradersPwdIndex} = state;
    return {
        UpdateTradersPwdIndex
    }
})(UpdateTradersPwdContainer);
