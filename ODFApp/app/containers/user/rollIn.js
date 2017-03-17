/**
 * Created by pc on 2017/3/16.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import RollIn from '../../pages/user/rollIn';

class RollInContainer extends Component {
    render() {
        return (
            <RollIn{...this.props} />
        )
    }
}

export default connect((state) => {
    const {RollInIndex} = state;
    return {
        RollInIndex
    }
})(RollInContainer);