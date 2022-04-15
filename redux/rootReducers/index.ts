import { combineReducers } from 'redux';
import {authReducer} from '../modules/auth/authReducer';

const rootReducer = combineReducers({
	auth: authReducer
});

export default rootReducer;
