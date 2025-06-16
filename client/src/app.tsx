// import { useLocation } from 'react-router-dom'
// import styles from './app.module.scss'
// import NavBar from './components/NavBar/navBar.tsx'
import AppRoutes from './routes.tsx'
import { CompanyProvider } from './contexts/companyContext.tsx'
import Modal from './components/Modal/modal.tsx'
import { useModal } from './contexts/modalContext.tsx'

const App = () => {
	const { isOpen, modalContent, onClose } = useModal()

	return (
		<CompanyProvider>
			<Modal
				isOpen={isOpen}
				onClose={onClose}>
				<h1>{modalContent}</h1>
			</Modal>
			<AppRoutes />
		</CompanyProvider>
	)
}

export default App
