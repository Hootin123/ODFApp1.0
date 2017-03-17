/**
 * Created by pc on 2017/3/16.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Identity from '../../../pages/user/identity/index';

class IdentityContainer extends Component {
    render() {
        return (
            <Identity {...this.props} />
        )
    }
}

export default connect((state) => {
    const {IdentityIndex} = state;
    return {
        IdentityIndex
    }
})(IdentityContainer);
