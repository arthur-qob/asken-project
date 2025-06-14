import { useUser } from '@/contexts/userContext'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
	children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isLoggedIn } = useUser()
	const navigate = useNavigate()

	return <>{isLoggedIn ? { children } : navigate('/error')}</>
}

export default ProtectedRoute
