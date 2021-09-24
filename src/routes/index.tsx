import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import * as React from 'react';
import Signin from '../pages/auth/Signin';
import Home from '../pages/landing/Home';
import { initFB } from '../firebase';
import storage from '../storage';
import { connect, useSelector } from 'react-redux';
import { updateCurrentUser } from '../redux/modules/auth/authActions';
import { createBrowserHistory } from 'history';

interface AppRoutesProps {
	
}
 
const AppRoutes: React.FunctionComponent<AppRoutesProps> = () => {
	React.useEffect(() => {
		initFB();
		storage.init()
			.catch((err) => console.log(err))
			.finally(async () => {
				let user: any = await storage.get('my-hotel-user');
				const history = createBrowserHistory();
				
				try {
					user = JSON.parse(user);
				} catch (error) { console.error('Error parsing User', error); }

				if (user) {
					updateCurrentUser(user);
					history.push('/home');
				}
			});
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/login" component={Signin} />
				<PrivateRoute exact path="/home" component={Home} />
			</Switch>
		</Router>
	);
}

interface PrivateRouteProps extends RouteProps {
	component: React.ComponentType<any>;
}
 
const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => {
	const auth: AuthState = useSelector((state: AppState) => state.auth);

	console.log(auth);
	return (
		<Route {...rest} render={props => (auth.loggedIn) ? <Component {...props} /> : <Redirect to="/login" /> } />
	);
}

const mapStateToProps = (state: AppState) => ({
	auth: state.auth
});

connect(mapStateToProps, {})(PrivateRoute);
 
export default connect(mapStateToProps, { updateCurrentUser })(AppRoutes);