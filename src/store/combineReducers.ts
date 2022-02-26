import {combineReducers} from 'redux';
import Login from '../modules/Login/reducer';
import Dashboard from '../modules/Dashboard/reducer';

const rootReducer = combineReducers({
  Login,
  Dashboard,
});

export default rootReducer;
