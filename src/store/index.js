import { combineReducers } from 'redux';
import { counterReducer, incidentReducer} from '../reducres/';

const combineReducer = combineReducers({
    counterReducer,
    incidentReducer
    
});

export default combineReducer;