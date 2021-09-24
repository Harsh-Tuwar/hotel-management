import { createStore, applyMiddleware, Store } from 'redux';
import { rootReducer } from '../rootReducer';
import thunkMiddleware from 'redux-thunk';

// export const store = createStore(
// 	rootReducer,
// 	{},
// 	applyMiddleware(thunkMiddleware)
// );
export const configureStore = (): Store<AppState> => {
	const store = createStore(
		rootReducer,
		undefined,
		applyMiddleware(thunkMiddleware)
	);

	return store
}