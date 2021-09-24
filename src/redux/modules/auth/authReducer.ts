import * as actionTypes from './authTypes';

const initialState: AuthState = {
	loggedIn: false,
	user: null
}

const authReducers = (state: AuthState = initialState, action: AuthAction) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_USER:
			console.log('here');
			return {
				...state,
				loggedIn: Boolean(action.user.length > 0),
				user: action.user
			};
		
		default:
			return state;
	}
};

export default authReducers;