/**
 * Created by pc on 2017/2/7.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Entrust from '../../pages/home/entrust';

class EntrustContainer extends Component {
    render() {
        return (
            <Entrust {...this.props} />
        )
    }
}

export default connect((state) => {
    const {EntrustIndex} = state;
    return {
        EntrustIndex
    }
})(EntrustContainer);