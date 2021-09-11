import * as React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from '../pages/auth/Signup';

export interface AppRoutesProps {
	
}
 
const AppRoutes: React.FunctionComponent<AppRoutesProps> = () => {
	return (
		<Router>
			<Route exact path="/" component={SignUp} />
		</Router>
	);
}
 
export default AppRoutes;