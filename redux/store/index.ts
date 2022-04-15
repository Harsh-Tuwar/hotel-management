import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../rootReducers';

// TODO: type middlewares
const middlewares: any = [];

middlewares.push(thunkMiddleware);

export const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(...middlewares),
	)
);
