import { useLocation } from 'react-router-dom'
import AppRoutes from './routes.tsx'
import styles from './app.module.scss'
import NavBar from './components/NavBar/NavBar.tsx'
import { CompanyProvider } from './contexts/Company.tsx'

const App = () => {
	const currentRoute = useLocation().pathname

	const routes = {
		navLinksMenu1:
			currentRoute === '/' ||
			currentRoute === '/about' ||
			currentRoute === '/contact'
				? [
						{ name: 'Home', href: '/' },
						{ name: 'About', href: '/about' },
						{ name: 'Contact', href: '/contact' }
				  ]
				: [
						{ name: 'Dashboard', href: '/dashboard' },
						{ name: 'Items', href: '/items' },
						{ name: 'Settings', href: '/settings' },
						{ name: 'Profile', href: '/profile' }
				  ],
		navLinksMenu2:
			currentRoute === '/' ||
			currentRoute === '/about' ||
			currentRoute === '/contact'
				? [
						{ name: 'Sign In', href: '/signin' },
						{ name: 'Sign Up', href: '/signup' }
				  ]
				: [{ name: 'Log Out', href: undefined, action: 'logout' }]
	}

	const notInAuth = !(
		currentRoute === '/signin' || currentRoute === '/signup'
	)

	const showNavBar =
		currentRoute === '/' ||
		currentRoute === '/about' ||
		currentRoute === '/contact' ||
		currentRoute === '/dashboard' ||
		currentRoute === '/items' ||
		currentRoute === '/settings' ||
		currentRoute === '/profile'

	return (
		<main className={styles.mainContainer}>
			{notInAuth && showNavBar && <NavBar routes={routes} />}

			<CompanyProvider>
				<AppRoutes />
			</CompanyProvider>
		</main>
	)
}

export default App
