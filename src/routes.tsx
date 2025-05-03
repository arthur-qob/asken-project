import { Routes, Route } from 'react-router-dom'
import Index from './pages/index'

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				index
				path='/'
				element={<Index />}
			/>
		</Routes>
	)
}

export default AppRoutes
