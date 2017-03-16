/**
 * Created by pc on 2017/3/3.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import ClassRoom from '../../pages/home/classRoom';

class ClassRoomContainer extends Component {
    render() {
        return (
            <ClassRoom {...this.props} />
        )
    }
}

export default connect((state) => {
    const {ClassRoomIndex} = state;
    return {
        ClassRoomIndex
    }
})(ClassRoomContainer);