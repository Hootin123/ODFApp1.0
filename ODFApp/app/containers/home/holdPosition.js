/**
 * Created by pc on 2017/2/8.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import HoldPosition from '../../pages/home/holdPosition';

class HoldPositionContainer extends Component {
    render() {
        return (
            <HoldPosition {...this.props} />
        )
    }
}

export default connect((state) => {
    const {HoldPositionIndex} = state;
    return {
        HoldPositionIndex
    }
})(HoldPositionContainer);