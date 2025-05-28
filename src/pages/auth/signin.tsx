import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { SignInWithEmail } from '@/utils/auth'

interface SignInProps {
	styles?: CSSModuleClasses
	route: string
}

const SignIn = ({ styles, route }: SignInProps) => {
	const [userData, setUserData] = useState({ email: '', password: '' })
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=]{8,}$/

	const handleInputChange =
		(field: 'email' | 'password') =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setUserData((prev) => ({ ...prev, [field]: e.target.value }))
		}

	const handleSignIn = async () => {
		if (!userData.email || !userData.password) {
			alert('Please fill in all fields')
			return
		}

		if (!emailRegex.test(userData.email)) {
			alert('Invalid email format')
			return
		}

		if (!passwordRegex.test(userData.password)) {
			alert(
				'Password must be at least 8 characters and contain one letter and one number'
			)
			return
		}

		setLoading(true)
		try {
			const res = await SignInWithEmail(userData.email, userData.password)
			if (res !== undefined) navigate('/dashboard')
		} finally {
			setLoading(false)
		}
	}

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
				onChange={handleInputChange('email')}
			/>

			<div className={styles?.password}>
				<input
					className={styles?.passwordInput}
					type={showPassword ? 'text' : 'password'}
					placeholder='Password'
					value={userData.password}
					onChange={handleInputChange('password')}
				/>
				<button onClick={() => setShowPassword((prev) => !prev)}>
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
						loading
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
				Don’t have an account? Create one now!
			</Link>
		</section>
	)
}

export default SignIn
