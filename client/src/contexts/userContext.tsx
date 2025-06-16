import { createContext, useContext, useEffect, useState } from 'react'
import { useLoading } from './loadingContext'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/utils/config/firebase'
import ModelError from '@/utils/modelError'

type UserContextPropsTypes = {
	user: User | null
	isLoggedIn: boolean
	idToken: string | null
	getFreshToken: () => Promise<string | null>
}

const UserContext = createContext<UserContextPropsTypes | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [idToken, setIdToken] = useState<string | null>(null)
	const { setIsLoading } = useLoading()

	useEffect(() => {
		setIsLoading(true)

		const sub = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user)
				setIsLoggedIn(true)

				const token = await user.getIdToken()
				setIdToken(token)

				setIsLoading(false)
			} else {
				setUser(null)
			}
		})

		setIsLoading(false)
		return () => sub()
	}, [])

	const getFreshToken = async () => {
		if (user) {
			const token = await user.getIdToken(true)
			setIdToken(token)

			return token
		}

		return null
	}

	return (
		<UserContext.Provider
			value={{ user, isLoggedIn, idToken, getFreshToken }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => {
	const context = useContext(UserContext)

	if (context === undefined)
		throw new ModelError('Please wrap your component with the component')

	return context
}
