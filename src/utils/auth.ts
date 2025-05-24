import { auth, rtdb } from '@/config/firebase'
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	updateProfile,
	sendEmailVerification
} from 'firebase/auth'
import { ref, set } from 'firebase/database'

export const SignInWithEmail = async (
	email: string,
	password: string
): Promise<void> => {
	try {
		const userCredentials = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)
		if (!userCredentials.user) throw new Error('User not found')
	} catch (error) {
		console.error('Error signing in:', error)
		throw new Error('Invalid email or password')
	}
}

export const SignUpWithEmail = async (
	name: string,
	email: string,
	password: string,
	role: string
): Promise<void> => {
	try {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)

		await sendEmailVerification(userCredentials.user)
		await updateProfile(userCredentials.user, { displayName: name })

		const userRef = ref(rtdb, `users/${userCredentials.user.uid}`)
		await set(userRef, {
			uid: userCredentials.user.uid,
			name,
			email,
			password,
			role,
			createdAt: new Date().toISOString().split('T')[0]
		})
	} catch (error) {
		console.error('Error creating user:', error)
		throw new Error('User could not be created')
	}
}

export const Logout = async (): Promise<void> => {
	try {
		await signOut(auth)
	} catch (error) {
		console.error('Error signing out:', error)
	}
}
