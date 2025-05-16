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

const AppRoutes = () => {
	return (
		<Routes>
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
				path='/dashboard'
				element={<Dashboard />}
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
				path='/companies'
				element={<Companies />}
			/>

			<Route
				path='/user/:id'
				element={<Profile />}
			/>

			<Route
				path='/companies/:id'
				element={<Company />}
			/>

			<Route
				path='/company/new'
				element={<NewCompany />}
			/>
		</Routes>
	)
}

export default AppRoutes
