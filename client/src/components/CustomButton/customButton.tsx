import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

type ButtonVariants = {
	variant?: 'primary' | 'secondary' | 'clear' | 'link'
}

type CustomButtonProps = ButtonVariants &
	ButtonHTMLAttributes<HTMLButtonElement> & {
		children?: React.ReactNode | string
	}

const CustomButton: React.FC<CustomButtonProps> = ({
	variant = 'primary',
	children,
	...props
}) => {
	// Esure that there's only props.title or children

	const variantStyle = `${styles['button-base']} ${
		styles[`${variant}-button` || 'primary-button']
	}`

	return (
		<button
			type={props.type || 'button'}
			{...props}
			className={variantStyle}>
			{children}
		</button>
	)
}

export default CustomButton
