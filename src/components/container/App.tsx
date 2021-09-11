import React from 'react';
import { store } from '../../redux/store/config';
import { Provider } from 'react-redux';
import AppRoutes from '../routes';

export interface AppProps {
	
}
 
const App: React.SFC<AppProps> = () => {
	return (
		<Provider store={store}>
			<AppRoutes />
		</Provider>
	);
}
 
export default App;