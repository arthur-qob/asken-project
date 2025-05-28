import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { SignUpWithEmail } from '@/utils/auth'

interface SignUpProps {
	styles?: CSSModuleClasses
	route: string
}

const roles = ['Logistics Operator', 'Warehouse Operator', 'Sales Manager']
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=]{8,}$/

const SignUp = ({ styles, route }: SignUpProps) => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: 'user'
	})

	const [formIsFilled, setFormIsFilled] = useState(false)
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const filled = Object.values(userData).every((field) => field !== '')
		setFormIsFilled(filled)
	}, [userData])

	const handleInputChange =
		(field: keyof typeof userData) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setUserData((prev) => ({ ...prev, [field]: e.target.value }))
		}

	const handleSignUp = async () => {
		if (!formIsFilled) {
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

		if (userData.password !== userData.confirmPassword) {
			alert('Passwords do not match')
			return
		}

		setLoading(true)
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
				onChange={handleInputChange('name')}
			/>

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
						}`}
					/>
				</button>
			</div>

			<div className={styles?.confirmPassword}>
				<input
					className={styles?.confirmPasswordInput}
					type={showConfirmPassword ? 'text' : 'password'}
					placeholder='Confirm password'
					value={userData.confirmPassword}
					onChange={handleInputChange('confirmPassword')}
				/>
				<button onClick={() => setShowConfirmPassword((prev) => !prev)}>
					<i
						className={`fa-solid fa-${
							showConfirmPassword ? 'eye' : 'eye-slash'
						}`}
					/>
				</button>
			</div>

			<select
				value={userData.role}
				onChange={handleInputChange('role')}>
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
