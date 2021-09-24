type AuthState = {
	user: Auth.User | null;
	loggedIn: boolean;
}

type AuthAction = {
	type: string;
	user?: Auth.User | null | undefined;
	payload?: AuthPayload;
}

type DispatchType = (args: AuthAction) => AuthAction;

type AppState = {
	auth: AuthState
}