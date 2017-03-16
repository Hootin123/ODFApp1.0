/**
 * Created by pc on 2017/3/2.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Protocol from '../../pages/home/protocol';

class ProtocolContainer extends Component {
    render() {
        return (
            <Protocol {...this.props} />
        )
    }
}

export default connect((state) => {
    const {ProtocolIndex} = state;
    return {
        ProtocolIndex
    }
})(ProtocolContainer);