import { auth, rtdb } from '@/utils/config/firebase'
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
): Promise<Object> => {
	let result: {
		[key: string]: {
			status: boolean
			message: string
			usrEmailVerified?: boolean
		}
	}

	return new Promise(async (res, rej) => {
		const userCredentials = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)

		if (userCredentials.user) {
			result = {
				success: {
					status: true,
					message: 'User found',
					usrEmailVerified: userCredentials.user.emailVerified
				}
			}

			res(result)
		} else {
			result = {
				error: {
					status: false,
					message: 'User not found'
				}
			}

			rej(result)
		}
	})
}

export const SignUpWithEmail = async (
	name: string,
	email: string,
	password: string,
	role: string
): Promise<Object> => {
	let result: { [key: string]: { status: boolean; message: string } }

	return new Promise(async (res, rej) => {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)

		if (userCredentials.user) {
			await sendEmailVerification(userCredentials.user)
			await updateProfile(userCredentials.user, { displayName: name })

			const userRef = ref(rtdb, `users/${userCredentials.user.uid}`)
			await set(userRef, {
				uid: userCredentials.user.uid,
				name,
				email,
				role,
				createdAt: new Date().toISOString().split('T')[0]
			})

			result = {
				success: {
					status: true,
					message: 'User created successfully'
				}
			}

			res(result)
		} else {
			result = {
				error: {
					status: false,
					message: 'User could not be created'
				}
			}

			rej(result)
		}
	})
}

export const Logout = async (): Promise<void> => {
	try {
		await signOut(auth)
	} catch (error) {
		console.error('Error signing out:', error)
	}
}
