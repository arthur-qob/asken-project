// import { useLocation } from 'react-router-dom'
// import styles from './app.module.scss'
// import NavBar from './components/NavBar/navBar.tsx'
import AppRoutes from './routes.tsx'
import { CompanyProvider } from './contexts/companyContext.tsx'

const App = () => {
	return (
		<CompanyProvider>
			<AppRoutes />
		</CompanyProvider>
	)
}

export default App
