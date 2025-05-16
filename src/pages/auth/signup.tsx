import { SignUpWithEmail, SignUpWithGoogle } from '@/utils/auth'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface SignUpProps {
	styles?: CSSModuleClasses
	route: string
}

const SignUp = ({ styles, route }: SignUpProps) => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: 'user'
	})

	const [formIsFilled, setFormIsFilled] = useState(false)

	useEffect(() => {
		if (Object.values(userData).some((field) => field === '')) {
			setFormIsFilled(false)
		} else if (Object.values(userData).every((field) => field !== '')) {
			setFormIsFilled(true)
		}
	}, [userData])

	const roles = ['Logistics Operator', 'Warehouse Operator', 'Sales Manager']

	const handleRoleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setUserData({ ...userData, role: e.target.value })
	}

	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const handleSignUp = async () => {
		setLoading(true)

		if (!formIsFilled) {
			alert('Please fill in all fields')
			setLoading(false)
			return
		}

		if (userData.password !== userData.confirmPassword) {
			alert('Passwords do not match')
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

		if (userData.password !== userData.confirmPassword) {
			alert('Passwords do not match')
			setLoading(false)
			return
		}

		try {
			await SignUpWithEmail(
				userData.name,
				userData.email,
				userData.password,
				userData.role
			)
			alert('Sign-up successful')

			navigate('/signin')
		} catch (error) {
			alert('Sign-up failed: ' + (error as Error).message)
		}
		setLoading(false)
	}

	const handleGoogleSignUp = async () => {
		try {
			await SignUpWithGoogle()
			alert('Google sign-in successful')

			navigate('/dashboard')
		} catch (error) {
			alert('Google sign-in failed: ' + (error as Error).message)
		}
	}

	const [showPassword, setShowPassword] = useState(false)
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword)
	}

	return (
		<section
			className={`${styles?.formContainer} ${
				route === '/signup' ? styles?.formContainerRight : ''
			}`}>
			<h1 className={styles?.title}>Sign Up</h1>

			<input
				className={styles?.name}
				type='text'
				placeholder='Name'
				value={userData.name}
				onChange={(name) =>
					setUserData({
						...userData,
						name: name.target.value
					})
				}
			/>

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
					name='password'
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

				<button onClick={togglePasswordVisibility}>
					<i
						className={`fa-solid fa-${
							showPassword ? 'eye' : 'eye-slash'
						}`}></i>
				</button>
			</div>

			<div className={styles?.confirmPassword}>
				<input
					className={styles?.confirmPasswordInput}
					type={showConfirmPassword ? 'text' : 'password'}
					placeholder='Confirm password'
					value={userData.confirmPassword}
					onChange={(confirmPassword) =>
						setUserData({
							...userData,
							confirmPassword: confirmPassword.target.value
						})
					}
				/>

				<button onClick={toggleConfirmPasswordVisibility}>
					<i
						className={`fa-solid fa-${
							showConfirmPassword ? 'eye' : 'eye-slash'
						}`}></i>
				</button>
			</div>

			<select
				onChange={handleRoleSelection}
				value={userData.role}>
				<option value=''>Select an option</option>
				{roles.map((role, index) => (
					<option
						key={index}
						value={role}>
						{role}
					</option>
				))}
			</select>

			<button
				className={styles?.submit}
				disabled={loading || !formIsFilled}
				onClick={handleSignUp}>
				Sign Up
			</button>

			<button
				className={styles?.googleBtn}
				onClick={handleGoogleSignUp}>
				<i className='fa-brands fa-google'></i>
				<span>Continue with Google</span>
			</button>

			<span className={styles?.separator}>
				<span></span>
				<p>OR</p>
				<span></span>
			</span>

			<Link
				className={styles?.link}
				to='/signin'>
				Already have an account? Sign in now!
			</Link>
		</section>
	)
}

export default SignUp
