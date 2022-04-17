import Router from 'next/router';
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { auth } from '../firebase';
import APP_ROUTES from '../utils/routes';
import storage from '../utils/storage';
import firebase from 'firebase/auth';

type AuthContextType = {
	user: any,
	checkIfUserAuthenticated: () => boolean;
	logout: () => Promise<void>;
	login: (email: string, password: string) => Promise<firebase.UserInfo | null>;
};

type Props = {
    children: ReactNode;
};

const AuthContextDefaultValues: AuthContextType = {
	user: null,
	checkIfUserAuthenticated: () => false,
	logout: async () => {},
	login: async (_email: string, _password: string) => null
};

const AuthContext = createContext<AuthContextType>(AuthContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<any>(null);

	const checkIfUserAuthenticated = () => {
		return Boolean(auth.currentUser);
	};

	const logout = async () => {
		await auth.signOut();
		await storage.removeItem('user');
	}

	const login = async (email: string, password: string) => {
		const { user: firebaseUser } = await auth.signInWithEmailAndPassword(
			email,
			password
		);

		if (!firebaseUser) {
			return null;
		}

		await storage.setItem('user', JSON.stringify(firebaseUser));
		return firebaseUser;
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
		logout: () => logout(),
		login: (email: string, password: string) => login(email, password),
    };

    return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
