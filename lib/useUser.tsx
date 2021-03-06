import { useEffect } from 'react';
import Router from 'next/router';
import { auth } from '../firebase/index';

export default function useUser({
	redirectTo = '',
	redirectIfFound = false,
} = {}) {
	const user = auth.currentUser;

	useEffect(() => {
		// if no redirect needed, just return (example: already on /dashboard)
		// if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
		if (!redirectTo || !user) return;

		if (
			// If redirectTo is set, redirect if the user was not found.
			(redirectTo && !redirectIfFound && !user) ||
			// If redirectIfFound is also set, redirect if the user was found
			(redirectIfFound && user)
		) {
			Router.push(redirectTo)
		}
	}, [user]);

	return { user };
};
