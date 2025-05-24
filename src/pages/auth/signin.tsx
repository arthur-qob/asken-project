import { SignInWithEmail } from '@/utils/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

interface SignInProps {
	styles?: CSSModuleClasses
	route: string
}

const SignIn = ({ styles, route }: SignInProps) => {
	const [userData, setUserData] = useState({
		email: '',
		password: ''
	})

	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const handleSignIn = async () => {
		setLoading(true)

		if (!userData.email || !userData.password) {
			alert('Please fill in all fields')
			setLoading(false)
			return
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=]{8,}$/

		if (!emailRegex.test(userData.email)) {
			alert('Invalid email format')
			setLoading(false)
			return
		}

		if (!passwordRegex.test(userData.password)) {
			alert(
				'Password must be at least 8 characters and contain one letter and one number'
			)
			setLoading(false)
			return
		}

		await SignInWithEmail(userData.email, userData.password).then((res) => {
			console.log('res', res)

			if (res !== undefined) {
				navigate('/dashboard')
			}
		})

		setLoading(false)
	}

	const [showPassword, setShowPassword] = useState(false)

	return (
		<section
			className={`${styles?.formContainer} ${
				route === '/signin' ? styles?.formContainerLeft : ''
			}`}>
			<h1 className={styles?.title}>Sign In</h1>

			<input
				className={styles?.email}
				type='email'
				placeholder='Email'
				value={userData.email}
				onChange={(email) =>
					setUserData({
						...userData,
						email: email.target.value
					})
				}
			/>

			<div className={styles?.password}>
				<input
					className={styles?.passwordInput}
					type={showPassword ? 'text' : 'password'}
					placeholder='Password'
					value={userData.password}
					onChange={(password) =>
						setUserData({
							...userData,
							password: password.target.value
						})
					}
				/>
				<button onClick={() => setShowPassword(!showPassword)}>
					<i
						className={`fa-solid fa-${
							showPassword ? 'eye' : 'eye-slash'
						}`}></i>
				</button>
			</div>

			<p className={styles?.resetPasswordLink}>Forgot password?</p>

			<button
				className={styles?.submit}
				disabled={loading}
				onClick={handleSignIn}>
				{loading ? (
					<ClipLoader
						color='#ffffff'
						size={20}
						loading={loading}
						aria-label='Loading Spinner'
					/>
				) : (
					'Sign In'
				)}
			</button>

			<span className={styles?.separator}>
				<span></span>
				<p>OR</p>
				<span></span>
			</span>

			<Link
				className={styles?.link}
				to='/signup'>
				Don't have an acocunt? Create one now!
			</Link>
		</section>
	)
}

export default SignIn
