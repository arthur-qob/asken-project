import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const ErrorPage = () => {
	return (
		<div>
			<h1 className={styles.errorMsg}>Acesso Negado</h1>
			<Link to='/login'>Favor fazer login para acessar essa página</Link>
		</div>
	)
}

export default ErrorPage
