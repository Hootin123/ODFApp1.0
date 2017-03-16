/**
 * Created by pc on 2017/2/6.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Simulation from '../../pages/home/simulation';

class SimulationContainer extends Component {
    render() {
        return (
            <Simulation {...this.props} />
        )
    }
}

export default connect((state) => {
    const {SimulationIndex} = state;
    return {
        SimulationIndex
    }
})(SimulationContainer);