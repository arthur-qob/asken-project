import { createContext, useContext, useState } from 'react'

type UserContextPropsTypes = {
	uid: string | undefined
	isLoggedIn: boolean
	setUid: (uid: string | undefined) => void
	setIsLoggedIn: (isLoggedIn: boolean) => void
}

const UserContext = createContext<UserContextPropsTypes | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [uid, setUid] = useState<string | undefined>(undefined)

	return (
		<UserContext.Provider
			value={{ uid, setUid, isLoggedIn, setIsLoggedIn }}>
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
