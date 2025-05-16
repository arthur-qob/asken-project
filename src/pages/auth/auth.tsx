import { useLocation, useNavigate } from 'react-router-dom'
import SignIn from './signin'
import SignUp from './signup'
import styles from './styles.module.scss'

const Auth = () => {
	const route = useLocation()
	const currentRoute = route.pathname

	const navigate = useNavigate()

	return (
		<div className={styles?.authContainer}>
			<button
				className={`${styles.backBtn} ${
					currentRoute === '/signin' ? styles.colored : ''
				}`}
				onClick={() => navigate('/')}>
				<i className='fa-solid fa-arrow-left'></i>
			</button>
			{currentRoute === '/signin' ? (
				<SignIn
					styles={styles}
					route={currentRoute}
				/>
			) : currentRoute === '/signup' ? (
				<SignUp
					styles={styles}
					route={currentRoute}
				/>
			) : null}

			<section
				className={`${styles.imgContainer} ${
					currentRoute === '/signup'
						? styles.imgLeft
						: styles.imgRight
				}`}>
				<h1>IMG HERE</h1>
			</section>
		</div>
	)
}

export default Auth
