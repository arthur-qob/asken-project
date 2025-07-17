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

	const [img, setImg] = useState<'/img_plane.png' | '/img_ship.png'>(
		'/img_ship.png'
	)

	const [imgAnimation, setImgAnimation] = useState<string>('')

	useEffect(() => {
		const prevRoute = prevRouteRef.current

		if (prevRoute !== currentRoute) {
			if (prevRoute === '/signin' && currentRoute === '/signup') {
				setAnimateDirection('left')
				setImg('/img_plane.png')
				setImgAnimation(styles.animateOpacity)
			} else if (prevRoute === '/signup' && currentRoute === '/signin') {
				setAnimateDirection('right')
				setImg('/img_ship.png')
				setImgAnimation(styles.animateOpacity)
			} else {
				setAnimateDirection(null)
			}
		}

		prevRouteRef.current = currentRoute

		setTimeout(() => {
			setImgAnimation('')
		}, 800)
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
					{/* <h1>IMG HERE</h1> */}
					<img
						className={`${styles.authImg} ${imgAnimation}`}
						src={img}
					/>
				</section>
			</div>
		</PageWrapper>
	)
}

export default Auth
