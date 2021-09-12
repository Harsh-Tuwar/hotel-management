import React from 'react';
import { store } from './redux/store/config';
import { Provider } from 'react-redux';
import AppRoutes from './routes';
import { InitFBApp } from './firebase';

export interface AppProps {
	
}
 
const App: React.FunctionComponent<AppProps> = () => {
	React.useEffect(() => {
		InitFBApp();
	}, []);

	return (
		<Provider store={store}>
			<AppRoutes />
		</Provider>
	);
}
 
export default App;