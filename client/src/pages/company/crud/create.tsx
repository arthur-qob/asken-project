import styles from './styles.module.scss'

const NewCompany = () => {
	return (
		<div className={styles.createCompanyContainer}>
			<h1>New Company</h1>
			<p>Register a new company</p>

			<input
				type='text'
				placeholder='Company Name'
			/>
		</div>
	)
}

export default NewCompany
