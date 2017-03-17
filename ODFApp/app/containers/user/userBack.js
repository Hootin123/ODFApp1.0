/**
 * Created by pc on 2017/3/16.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import UserBack from '../../pages/user/userBack';

class UserBackContainer extends Component {
    render() {
        return (
            <UserBack{...this.props} />
        )
    }
}

export default connect((state) => {
    const {UserBackIndex} = state;
    return {
        UserBackIndex
    }
})(UserBackContainer);
