import { createContext, useContext, useEffect, useState } from 'react'
import { useLoading } from './loadingContext'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/utils/config/firebase'

type UserContextPropsTypes = {
	user: User | null
	isLoggedIn: boolean
}

const UserContext = createContext<UserContextPropsTypes | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const { setIsLoading } = useLoading()

	useEffect(() => {
		setIsLoading(true)

		const sub = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
				setIsLoggedIn(true)
				setIsLoading(false)
			} else {
				setUser(null)
			}
		})

		setIsLoading(false)
		return () => sub()
	}, [])

	return (
		<UserContext.Provider value={{ isLoggedIn, user }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => {
	const context = useContext(UserContext)

	if (context === undefined)
		throw new Error('Please wrap your component with the component')

	return context
}
