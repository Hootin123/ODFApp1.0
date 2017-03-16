/**
 * Created by pc on 2017/2/21.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Home from '../../pages/home/';

class HomeContainer extends Component {
    render() {
        return (
            <Home {...this.props} />
        )
    }
}

export default connect((state) => {
    const {HomeIndex} = state;
    return {
        HomeIndex
    }
})(HomeContainer);
