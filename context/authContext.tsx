import Router from 'next/router';
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { auth } from '../firebase';
import APP_ROUTES from '../utils/routes';
import storage from '../utils/storage';

type AuthContextType = {
	user: any,
	checkIfUserAuthenticated: () => boolean;
	logout: () => Promise<void>;
};

const AuthContextDefaultValues: AuthContextType = {
	user: null,
	checkIfUserAuthenticated: () => false,
	logout: async () => {}
};

const AuthContext = createContext<AuthContextType>(AuthContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<any>(null);

	const checkIfUserAuthenticated = () => {
		return Boolean(auth.currentUser);
	};

	const logout = async () => {
		await auth.signOut();
		await storage.removeItem('user');
	}

	useEffect(() => {
		const { pathname } = Router;

		auth.onAuthStateChanged((user) => {
			console.log(user);
			if (user) {
				setUser(user);
				if ([
					APP_ROUTES.LOGIN,
					APP_ROUTES.SIGN_UP,
					APP_ROUTES.FORGOT_PASSWORD
				].includes(pathname)) {
					Router.push(APP_ROUTES.HOME);
				}
			} else {
				Router.push(APP_ROUTES.LOGIN);
			}
		});
	}, []);

	const value = {
		user: user,
		checkIfUserAuthenticated: () => checkIfUserAuthenticated(),
		logout: () => logout()
    };

    return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
