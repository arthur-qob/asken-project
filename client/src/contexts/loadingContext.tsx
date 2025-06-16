import ModelError from '@/utils/modelError'
import { createContext, useContext, useState } from 'react'

type LoadingContextTypes = {
	isLoading: boolean
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = createContext<LoadingContextTypes | undefined>(
	undefined
)

export const LoadingProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const [isLoading, setIsLoading] = useState(false)

	return (
		<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
			{children}
		</LoadingContext.Provider>
	)
}

export const useLoading = () => {
	const context = useContext(LoadingContext)

	if (!context) {
		throw new ModelError('useLoading must be used within LoadingProvider')
	}

	return context
}
