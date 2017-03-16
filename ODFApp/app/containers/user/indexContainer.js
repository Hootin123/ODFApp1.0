/**
 * Created by pc on 2017/2/21.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import User from '../../pages/user/';

class UserContainer extends Component {
    render() {
        return (
            <User {...this.props} />
        )
    }
}

export default connect((state) => {
    const {UserIndex} = state;
    return {
        UserIndex
    }
})(UserContainer);
