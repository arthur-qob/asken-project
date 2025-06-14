import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth/auth'
import Company from './pages/company'
import Profile from './pages/profile'
import { Companies } from './pages/auth/companies'
import NewCompany from './pages/company/crud/create'
import ErrorPage from './pages/error'
import { useUser } from '@/contexts/userContext'
import { useNavigate } from 'react-router-dom'
import { HomePage } from './pages/landing'
import { AnimatePresence } from 'framer-motion'
import { PageWrapper } from './components/pageWrapper'

type ProtectedRouteProps = {
	children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isLoggedIn } = useUser()
	const navigate = useNavigate()

	return <>{isLoggedIn ? { children } : navigate('/error')}</>
}

const AppRoutes = () => {
	return (
		<AnimatePresence mode='wait'>
			<Routes>
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
					path='/error'
					element={
						<PageWrapper>
							<ErrorPage />
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
