import { combineReducers } from 'redux';
import authReducer from '../modules/auth/authReducer';

export const rootReducer = combineReducers<AppState>({
	auth: authReducer,
});