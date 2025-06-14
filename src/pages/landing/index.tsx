import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import logo from '@/assets/images/logo.png'
import CustomButton from '@/components/CustomButton/customButton'

export const HomePage = () => {
	const navigate = useNavigate()

	const Button = CustomButton

	return (
		<section className={styles.homeContainer}>
			<img src={logo} />

			<div className={styles.btnContainer}>
				<Button
					type='button'
					onClick={() => {
						navigate('/signin')
					}}>
					Sign In
				</Button>
				<Button
					type='button'
					onClick={() => {
						navigate('/signup')
					}}>
					Sign Up
				</Button>
			</div>
		</section>
	)
}
