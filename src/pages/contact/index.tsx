import styles from './styles.module.scss'

const Contact = () => {
	return (
		<section className={styles.contactContainer}>
			<h1>Contact</h1>

			<input
				type='text'
				placeholder='Name'
			/>

			<input
				type='email'
				placeholder='Email'
			/>

			<input
				type='text'
				placeholder='Subject'
			/>

			<textarea
				placeholder='Message'
				rows={5}></textarea>

			<button>Send</button>
		</section>
	)
}

export default Contact
