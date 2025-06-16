import { useLocation, useNavigate } from 'react-router-dom'
import SignIn from './signin'
import SignUp from './signup'
import styles from './styles.module.scss'
import { PageWrapper } from '@/components/pageWrapper'
import { useEffect, useRef, useState } from 'react'

const Auth = () => {
	const route = useLocation()
	const currentRoute = route.pathname

	const navigate = useNavigate()

	const [animateDirection, setAnimateDirection] = useState<
		'left' | 'right' | null
	>(null)
	const prevRouteRef = useRef(currentRoute)

	useEffect(() => {
		const prevRoute = prevRouteRef.current

		if (prevRoute !== currentRoute) {
			// If moving from signin to signup, animate left
			if (prevRoute === '/signin' && currentRoute === '/signup') {
				setAnimateDirection('left')
			}
			// If moving from signup to signin, animate right
			else if (prevRoute === '/signup' && currentRoute === '/signin') {
				setAnimateDirection('right')
			} else {
				setAnimateDirection(null)
			}
		}

		prevRouteRef.current = currentRoute
	}, [currentRoute])

	return (
		<PageWrapper>
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
					} ${
						animateDirection === 'left'
							? styles.animateRightToLeft
							: animateDirection === 'right'
							? styles.animateLeftToRight
							: ''
					}`}>
					<h1>IMG HERE</h1>
				</section>
			</div>
		</PageWrapper>
	)
}

export default Auth
