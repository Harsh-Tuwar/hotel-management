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
	signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
	sendForgetPasswordLink: (email: string) => Promise<string>
};

type Props = {
    children: ReactNode;
};

const AuthContextDefaultValues: AuthContextType = {
	user: null,
	checkIfUserAuthenticated: () => false,
	logout: async () => {},
	login: async (_email: string, _password: string) => null,
	signup: async (_email: string, _password: string, _firstName: string, _lastName: string) => false,
	sendForgetPasswordLink: async (_email: string) => ''
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

	const signup = async (
		email: string,
		password: string,
		firstName: string,
		lastName: string
	) => {
		const { user: newUser } = await auth.createUserWithEmailAndPassword(
			email,
			password
		);

		if (!newUser) {
			return false;
		}

		await storage.setItem('user', JSON.stringify(newUser));
		await auth.currentUser?.updateProfile({
			displayName: `${firstName} ${lastName}`
		});

		return true;
	}

	const sendForgetPasswordLink = async (email: string): Promise<string> => {
		return auth.sendPasswordResetEmail(email).then(() => 'Sent').catch((e) => {
			return e.message;
		});
	}

	useEffect(() => {
		const { pathname } = Router;

		auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				if ([
					APP_ROUTES.LOGIN,
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
		logout: async () => await logout(),
		login: async (email: string, password: string) => await login(email, password),
		signup: async (email: string, password: string, firstName: string, lastName: string) => await signup(
			email,
			password,
			firstName,
			lastName
		),
		sendForgetPasswordLink: async (email: string) => await sendForgetPasswordLink(email)
    };

    return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
