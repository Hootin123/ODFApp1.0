/**
 * Created by pc on 2017/2/21.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import News from '../../pages/news/';

class NewsContainer extends Component {
    render() {
        return (
            <News {...this.props} />
        )
    }
}

export default connect((state) => {
    const {NewsIndex} = state;
    return {
        NewsIndex
    }
})(NewsContainer);
