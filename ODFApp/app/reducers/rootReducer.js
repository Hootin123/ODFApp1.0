/**
 * Created by pc on 2017/2/21.
 */
import { combineReducers } from 'redux';

import HomeIndex from './home/indexReducer';
import SimulationIndex from './home/simulationReducer';
import EntrustIndex from './home/entrustReducer';
import AccountIndex from './home/accountReducer';

export default rootReducer = combineReducers({
    HomeIndex,
    SimulationIndex,
    EntrustIndex,
    AccountIndex
    // Login,

})
