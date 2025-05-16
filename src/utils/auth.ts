import { auth, rtdb } from '@/config/firebase'
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithPopup,
	signOut
} from 'firebase/auth'
import { ref, set } from 'firebase/database'

const provider = new GoogleAuthProvider()

export const SignInWithEmail = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)
		return userCredential.user
	} catch (error) {
		console.error('Error signing in with email and password:', error)
	}
}

export const SignInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider)
		return result.user
	} catch (error) {
		console.error('Error signing in with Google:', error)
	}
}

export const SignUpWithEmail = async (
	name: string,
	email: string,
	password: string,
	role: string
) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		if (userCredential.user) {
			const userRef = ref(rtdb, `users/${userCredential.user.uid}`)
			try {
				await set(userRef, {
					uid: userCredential.user.uid,
					name: name,
					email: email,
					password: password,
					role: role,
					createdAt: new Date().toISOString().split('T')[0]
				})

				return userCredential.user
			} catch (error) {
				console.error(
					'Error saving user data to Realtime Database:',
					error
				)
			}
		} else {
			throw new Error('User could not be created')
		}
	} catch (error) {
		console.error('Error signing up with email and password:', error)
	}
}

export const SignUpWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider)
		return result.user
	} catch (error) {
		console.error('Error signing up with Google:', error)
	}
}

export const Logout = async () => {
	try {
		await signOut(auth)
	} catch (error) {
		console.error('Error signing out:', error)
	}
}
