import * as Auth from 'firebase/auth';

export class FBAuth {
	static async login(email: string, pass: string) {
		const auth = Auth.getAuth();
		const authReq = await Auth.signInWithEmailAndPassword(auth, email, pass);


		return authReq.user;
		// if (authReq.user) {
		// 	return authReq.user;
		// 	await storage.set('my-hotel-user', authReq.user);
		// } else {
		// 	this.setUser();
		// 	console.log('Login Fail');
		// }
	}

	// static logout() {
	// 	const auth = Auth.getAuth();

	// 	Auth.signOut(auth)
	// 		.then(async () => {
	// 			this.setUser();
	// 		}).catch((err) => {
	// 			const { code, message } = err;
	// 			console.log(code, message);
	// 		});
	// }

	static getAuthInstance() {
		return Auth.getAuth();
	}

	// static setUser(user?: Auth.User | undefined) {
	// 	if (user) {
	// 		this.authenticated = true;
	// 		this.user = user;
	// 	} else {
	// 		this.authenticated = false;
	// 		this.user = null;
	// 	}
	// }

	// static authChangeHandler() {
	// 	const auth = Auth.getAuth();
		
	// 	Auth.onAuthStateChanged(auth, async (u) => {
	// 		if (u) {
	// 			this.setUser(u);
	// 		} else {
	// 			this.setUser();
	// 			await storage.clear();
	// 		}
	// 	});
	// }

	// static async checkAuthStatus() {
	// 	if (!this.authenticated && this.user && Object.values(this.user).length > 0) {
	// 		this.authenticated = true;
	// 	}

	// 	if (!this.authenticated) {
	// 		let userData: any = await storage.get('my-hotel-user');

	// 		if (userData) {
	// 			try {
	// 				userData = JSON.parse(userData);
	// 			} catch (error) {
	// 				console.error(error);
	// 			}

	// 			this.setUser(userData);
	// 		} else {
	// 			this.setUser();
	// 		}
	// 	}
	// }
}