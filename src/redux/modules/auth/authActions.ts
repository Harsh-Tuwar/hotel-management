import { User } from '@firebase/auth';
import { FBAuth } from '../../../firebase/auth';
import storage from '../../../storage';
import * as actionTypes from './authTypes';

export const loginUser = async (email: string, password: string) => {
	const action: AuthAction = {
		type: actionTypes.SET_CURRENT_USER,
	}

	const user = await FBAuth.login(email, password);
	action.user = user;

	storage.set('my-hotel-user', JSON.stringify(user));
	
	return simulateHttpRequest(action);
}

export const updateCurrentUser = (user: User) => (dispatch: DispatchType) => {
	const action: AuthAction = {
		type: actionTypes.SET_CURRENT_USER,
		user: user
	}
	
	dispatch(action);
	// return simulateHttpRequest(action);
}

export const simulateHttpRequest = (action: AuthAction) => (dispatch: DispatchType) => {
	console.log('dispatch');
	dispatch(action);
	// return (dispatch: DispatchType) => {
	// 	// switch (action.type) {
	// 	// 	case (actionTypes.SET_CURRENT_USER):
	// 	// 		dispatch(action);
	// 	// 		break;
			
	// 	// 	default:
	// 	// 		dispatch(action);
	// 	// }
	// }
}