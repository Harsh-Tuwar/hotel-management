import * as React from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch} from 'react-router-dom';
import Signin from '../pages/auth/Signin';
import Home from '../pages/landing/Home';

interface RouteInfoProps extends RouteProps{
	title?: string;
	path: string;
	icon?: string;
	component: React.ComponentType<any>;
}

export const routes: RouteInfoProps[] = [
	{
		path: "/",
		title: "Home",
		component: Home,
	},
	{
		path: '/login',
		title: 'Login',
		component: Signin,
	}
]

export interface AppRoutesProps {
	
}
 
const AppRoutes: React.FunctionComponent<AppRoutesProps> = () => {
	const loggedIn = false;
	
	return (
		(loggedIn && <Router>
			<Switch>
				{
					routes.map((route) => (
						<Route exact key={`route-${route.path}`} {...route} />
					))
				}
			</Switch>
		</Router>) || <Signin />
	);
}
 
export default AppRoutes;