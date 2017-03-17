/**
 * Created by pc on 2017/3/17.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import AddBank from '../../../pages/user/identity/addBank';

class AddBankContainer extends Component {
    render() {
        return (
            <AddBank {...this.props} />
        )
    }
}

export default connect((state) => {
    const {AddBankIndex} = state;
    return {
        AddBankIndex
    }
})(AddBankContainer);
