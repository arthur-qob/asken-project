import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth/auth'
import Company from './pages/company'
import Profile from './pages/profile'
import Companies from './pages/auth/companies'
import NewCompany from './pages/company/crud/create'
import Contact from './pages/contact'
import About from './pages/about'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ErrorPage from './pages/error'

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path='/error'
				element={<ErrorPage />}
			/>

			<Route
				index
				path='/'
				element={<Landing />}
			/>

			<Route
				path='/about'
				element={<About />}
			/>

			<Route
				path='/contact'
				element={<Contact />}
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
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>

			<Route
				path='/companies'
				element={
					<ProtectedRoute>
						<Companies />
					</ProtectedRoute>
				}
			/>

			<Route
				path='/user/:id'
				element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				}
			/>

			<Route
				path='/companies/:id'
				element={
					<ProtectedRoute>
						<Company />
					</ProtectedRoute>
				}
			/>

			<Route
				path='/company/new'
				element={
					<ProtectedRoute>
						<NewCompany />
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}

export default AppRoutes
