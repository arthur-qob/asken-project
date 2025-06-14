import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { SignInWithEmail } from '@/utils/auth'
import CustomButton from '@/components/CustomButton/customButton'

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
		if (Object.values(userData).some((value) => value.trim() === '')) {
			alert('Please fill in all fields')
			return
		}

		if (!emailRegex.test(userData.email)) {
			alert('Invalid email format')
			return
		}

		if (!passwordRegex.test(userData.password)) {
			alert(
				'Password must be at least 8 characters, and can contain letters, digits and symbols'
			)
			return
		}

		setLoading(true)

		await SignInWithEmail(userData.email, userData.password).then((res) => {
			if (Object.keys(res)[0] === 'success') {
				if (Object.values(res)[0].usrEmailVerified === false) {
					// Create custom component to display error messages
					alert('Please verify your email')
				}

				navigate('/dashboard')
			} else {
				// Create custom component to display error messages
				alert(Object.values(res)[0].message)
			}
		})

		setLoading(false)
	}

	const Button = CustomButton

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

			<Button
				variant='primary'
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
			</Button>

			<span className={styles?.separator}>
				<span></span>
				<p>OR</p>
				<span></span>
			</span>

			<Link
				className={styles?.link}
				to='/signup'>
				Don't have an account? Create one now!
			</Link>
		</section>
	)
}

export default SignIn
