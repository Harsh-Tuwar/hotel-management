export interface User {
	fname: string;
	lname: string;
	email: string;
	ph: string;
}

export interface State {
	authenticated: boolean;
}

const authReducers = (state: State = { authenticated: false }, action: any) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default authReducers;