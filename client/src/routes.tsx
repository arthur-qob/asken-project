import { Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth/auth'
import Company from './pages/company'
import Profile from './pages/profile'
import { Companies } from './pages/auth/companies'
import NewCompany from './pages/company/crud/create'
import { useUser } from '@/contexts/userContext'
import { HomePage } from './pages/landing'
import { AnimatePresence } from 'framer-motion'
import { PageWrapper } from './components/pageWrapper'
import { TestPage } from './pages/tests'
import { useModal } from './contexts/modalContext'
import { useEffect } from 'react'

type ProtectedRouteProps = {
	children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isLoggedIn, idToken, getFreshToken } = useUser()
	const { setIsOpen, setModalContent, setOnClose } = useModal()
	const navigate = useNavigate()

	useEffect(() => {
		const verifyAccess = async () => {
			const token = idToken || (await getFreshToken())

			if (!isLoggedIn || !token) {
				setIsOpen(true)
				setModalContent(
					'You do not have access to this page. Please sign in and try again.'
				)
				setOnClose(() => () => {
					setIsOpen(false)
					navigate('/')
				})
			}
		}

		verifyAccess()
	}, [isLoggedIn, idToken])

	if (!isLoggedIn || !idToken) return null

	return <>{children}</>
}

const AppRoutes = () => {
	return (
		<AnimatePresence mode='wait'>
			<Routes>
				<Route
					path='/test'
					element={
						<ProtectedRoute>
							<TestPage />
						</ProtectedRoute>
					}
				/>

				<Route
					index
					path='/'
					element={
						<PageWrapper>
							<HomePage />
						</PageWrapper>
					}
				/>

				<Route
					path='/signin'
					element={<Auth />}
				/>

				<Route
					path='/signup'
					element={<Auth />}
				/>

				<Route
					path='/dashboard'
					element={
						<PageWrapper>
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						</PageWrapper>
					}
				/>

				<Route
					path='/companies'
					element={
						<PageWrapper>
							<ProtectedRoute>
								<Companies />
							</ProtectedRoute>
						</PageWrapper>
					}
				/>

				<Route
					path='/user/:id'
					element={
						<PageWrapper>
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						</PageWrapper>
					}
				/>

				<Route
					path='/companies/:id'
					element={
						<PageWrapper>
							<ProtectedRoute>
								<Company />
							</ProtectedRoute>
						</PageWrapper>
					}
				/>

				<Route
					path='/company/new'
					element={
						<PageWrapper>
							<ProtectedRoute>
								<NewCompany />
							</ProtectedRoute>
						</PageWrapper>
					}
				/>
			</Routes>
		</AnimatePresence>
	)
}

export default AppRoutes
