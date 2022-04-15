/* eslint-disable import/no-anonymous-default-export */
// import { SET}

const initialState = {
	user: {}
}

// TODO: type any
export const authReducer = (state = initialState, action: any) => {
	switch (action.type) {
		default:
			return { ...state };
	}
}