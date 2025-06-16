import ModelError from '@/utils/modelError'
import { createContext, useContext, useState } from 'react'

type ModalContextProps = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	modalContent: string | React.ReactNode | null
	setModalContent: (msg: string) => void
	onClose: (param: any) => any
	setOnClose: (param: any) => any
}

export const ModalContext = createContext<ModalContextProps | undefined>(
	undefined
)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [modalContent, setModalContent] = useState<
		string | React.ReactNode | null
	>(null)
	const [onClose, setOnClose] = useState<(param: any) => any>(() =>
		setIsOpen(false)
	)

	return (
		<ModalContext.Provider
			value={{
				isOpen,
				setIsOpen,
				modalContent,
				setModalContent,
				onClose,
				setOnClose
			}}>
			{children}
		</ModalContext.Provider>
	)
}

export const useModal = () => {
	const context = useContext(ModalContext)

	if (!context)
		throw new ModelError(
			'To use useModal, your app needs to be wrapped with its Provider'
		)

	return context
}
