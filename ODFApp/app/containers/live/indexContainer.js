/**
 * Created by pc on 2017/2/21.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Live from '../../pages/live/';

class LiveContainer extends Component {
    render() {
        return (
            <Live {...this.props} />
        )
    }
}

export default connect((state) => {
    const {LiveIndex} = state;
    return {
        LiveIndex
    }
})(LiveContainer);
