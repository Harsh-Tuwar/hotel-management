import { createBrowserHistory } from 'history';
import * as React from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom';
import { FBAuth } from '../firebase/auth';
import Signin from '../pages/auth/Signin';
import Home from '../pages/landing/Home';

interface RouteInfoProps extends RouteProps{
	title?: string;
	path: string;
	icon?: string;
	privateRoute?: boolean;
	component: React.ComponentType<any>;
}

export const routes: RouteInfoProps[] = [
	{
		path: "/home",
		title: "Home",
		component: Home,
		privateRoute: true
	},
	{
		path: '/login',
		title: 'Login',
		component: Signin
	}
]

export interface AppRoutesProps {
	
}

const AppRoutes: React.FunctionComponent<AppRoutesProps> = () => {
	const [loggedIn, setLoggedIn] = React.useState(false);
	
	React.useEffect(() => {
		const authInstace = FBAuth.getAuthInstance();
		const history = createBrowserHistory();

		authInstace.onAuthStateChanged((u) => {
			if (u) {
				setLoggedIn(true);
				FBAuth.setUser(u);
				history.push('/home');
			} else {
				setLoggedIn(false);
				FBAuth.setUser(null);
				history.push('/login');
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn]);

	return (
		(loggedIn ? <Router>
			<Switch>
				{routes.map((route, index) => {
					if (route.privateRoute) {
						return (<Route exact key={`route-${route.path}`} {...route} />)
					} else {
						return <Home key={index} />;
					}
				})}
			</Switch>
		</Router> : <Signin />)
	);
}
 
export default AppRoutes;