/**
 * Created by pc on 2017/3/16.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import RollOut from '../../pages/user/rollOut';

class RollOutContainer extends Component {
    render() {
        return (
            <RollOut{...this.props} />
        )
    }
}

export default connect((state) => {
    const {RollOutIndex} = state;
    return {
        RollOutIndex
    }
})(RollOutContainer);