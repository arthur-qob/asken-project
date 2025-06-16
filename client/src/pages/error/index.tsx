import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import Modal from '@/components/Modal/modal'
import { useEffect, useState } from 'react'

const ErrorPage = () => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const handleLoad = () =>
			setTimeout(() => {
				setIsOpen(true)
			}, 2000)
		window.addEventListener('load', handleLoad)
		return () => window.removeEventListener('load', handleLoad)
	}, [])

	return (
		<div>
			<Modal isOpen={isOpen}>
				<h1 className={styles.errorMsg}>Acesso Negado</h1>
				<Link to='/login'>
					Favor fazer login para acessar essa página
				</Link>
			</Modal>
		</div>
	)
}

export default ErrorPage
