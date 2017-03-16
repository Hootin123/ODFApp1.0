/**
 * Created by pc on 2017/2/7.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Register from '../pages/register';

class RegisterContainer extends Component {
    render() {
        return (
            <Register {...this.props} />
        )
    }
}

export default connect((state) => {
    const {RegisterIndex} = state;
    return {
        RegisterIndex
    }
})(RegisterContainer);