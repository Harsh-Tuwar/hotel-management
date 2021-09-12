import React from 'react';
import { store } from './redux/store/config';
import { Provider } from 'react-redux';
import AppRoutes from './routes';
import { initFB } from './firebase';
import { Storage } from './storage';

export interface AppProps {
	
}
 
const App: React.FunctionComponent<AppProps> = () => {
	React.useEffect(() => {
		initFB();
		Storage.init();
	}, []);

	return (
		<Provider store={store}>
			<AppRoutes />
		</Provider>
	);
}
 
export default App;