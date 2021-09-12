import * as Auth from 'firebase/auth';

export class FBAuth {
	static authenticated = false;
	static user: any = null; // add types for fbauth.user
	
	static login(email: string, pass: string) {
		const auth = Auth.getAuth();

		Auth.signInWithEmailAndPassword(auth, email, pass)
			.then(async (userCredential) => {
				FBAuth.user = userCredential.user;
				FBAuth.authenticated = true;
			}).catch((err) => {
				const { code, message } = err;
				console.log('Login Fail');
				console.log(code, message);
			});
	}

	static logout() {
		const auth = Auth.getAuth();

		Auth.signOut(auth)
			.then(async () => {
				FBAuth.authenticated = false;
				FBAuth.user = null;
			}).catch((err) => {
				const { code, message } = err;
				console.log(code, message);
			});
	}

	static getAuthInstance() {
		return Auth.getAuth();
	}

	static setUser(user: Auth.User | null) {
		if (user !== null) {
			this.authenticated = true;
			this.user = user;
		} else {
			this.authenticated = false;
			this.user = null;
		}
	}

	static authChangeHandler() {
		const auth = Auth.getAuth();
		
		Auth.onAuthStateChanged(auth, (u) => {
			console.log(u);
			if (u) {
				FBAuth.authenticated = true;
				FBAuth.user = u;
			}


			console.log('FBAuth.authenticated', FBAuth.authenticated);
		});
	}
}