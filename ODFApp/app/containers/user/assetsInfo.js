/**
 * Created by pc on 2017/3/16.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import AssetsInfo from '../../pages/user/assetsInfo';

class AssetsInfoContainer extends Component {
    render() {
        return (
            <AssetsInfo{...this.props} />
        )
    }
}

export default connect((state) => {
    const {AssetsInfoIndex} = state;
    return {
        AssetsInfoIndex
    }
})(AssetsInfoContainer);
