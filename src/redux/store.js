import {createStore, combineReducers} from 'redux';
import userReducer from './userReducer';
import calendarReducer from './calendarReducer';

let rootReducer = combineReducers({userReducer, calendarReducer})

export default createStore(rootReducer);