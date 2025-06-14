import styles from './styles.module.scss'

type ModalProps = {
	children: React.ReactNode
	isOpen: boolean
	onClose?: () => void | undefined
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
	if (!isOpen) return null

	return (
		<section
			className={styles.modalBackground}
			onClick={onClose}>
			<div className={styles.modal}>
				{onClose && (
					<button
						className={styles.closeBtn}
						onClick={onClose}>
						&times;
					</button>
				)}
				{children}
			</div>
		</section>
	)
}

export default Modal
