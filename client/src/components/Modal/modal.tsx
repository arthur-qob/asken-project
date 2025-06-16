import styles from './styles.module.scss'

type ModalProps = {
	children: React.ReactNode
	isOpen: boolean
	onClose?: (param: any) => any
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
	if (!isOpen) return null

	return (
		<div
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
		</div>
	)
}

export default Modal
