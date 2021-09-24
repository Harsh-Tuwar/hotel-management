import React from 'react';
import { configureStore } from './redux/store/config';
import { Provider } from 'react-redux';
import AppRoutes from './routes';
// import { initFB } from './firebase';
// import storage from './storage';
// import { FBAuth } from './firebase/auth';

export interface AppProps {
	
}
 
const App: React.FunctionComponent<AppProps> = () => {
	const store = configureStore();
	
	return (
		<Provider store={store}>
			<AppRoutes />
		</Provider>
	);
}
 
export default App;