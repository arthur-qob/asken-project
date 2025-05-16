import Modal from '@/components/Modal/Modal'
import styles from './styles.module.scss'
import { useState } from 'react'

const Dashboard = () => {
	const [isOpen, setIsOpen] = useState(false)

	const [ModalContent, setModalContent] = useState<React.ReactNode | null>(
		null
	)

	const btns = {
		Add: {
			icon: 'fa-solid fa-plus',
			content: () => (
				<>
					<h2>Adicionar Produto</h2>
					<div className={styles.formGroup}>
						<label htmlFor='ref'>Ref</label>
						<input
							type='text'
							id='ref'
							placeholder='Referência do Produto'
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='desc'>Descrição</label>
						<input
							type='text'
							id='desc'
							placeholder='Descrição do Produto'
						/>
					</div>
					{/* Add more fields as needed */}
					<button type='submit'>Adicionar</button>
				</>
			)
		},
		Edit: {
			icon: 'fa-solid fa-pen-to-square',
			content: () => (
				<>
					<h2>Editar Produto</h2>
					<div className={styles.formGroup}>
						<label htmlFor='ref'>Ref</label>
						<input
							type='text'
							id='ref'
							placeholder='Referência do Produto'
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='desc'>Descrição</label>
						<input
							type='text'
							id='desc'
							placeholder='Descrição do Produto'
						/>
					</div>
					{/* Add more fields as needed */}
					<button type='submit'>Salvar Alterações</button>
				</>
			)
		},
		Delete: {
			icon: 'fa-solid fa-trash',
			content: () => (
				<>
					<h2>Deletar Produto</h2>
					<div className={styles.formGroup}>
						<label htmlFor='ref'>Ref</label>
						<input
							type='text'
							id='ref'
							placeholder='Referência do Produto'
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='desc'>Descrição</label>
						<input
							type='text'
							id='desc'
							placeholder='Descrição do Produto'
						/>
					</div>
					{/* Add more fields as needed */}
					<button type='submit'>Deletar</button>
				</>
			)
		}
	}

	return (
		<div className={styles.container}>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}>
				{ModalContent}
			</Modal>

			<h1>Dashboard</h1>

			<div className={`${styles.produtos} fade`}>
				<div className={styles.busca}>
					<label htmlFor='ref'>Busque um produto específico:</label>
					<input
						id='ref'
						type='text'
						placeholder='Referência do Produto'
					/>
				</div>
				<h3>Produtos</h3>
				<table className={styles.tableProdutos}>
					<thead>
						<tr>
							<th>Ref</th>
							<th>Descrição</th>
							<th>Lote</th>
							<th>Qtd comprada</th>
							<th>Qtd recebida</th>
							<th>Valor Unitário</th>
							<th>Valor Total</th>
							<th>Box</th>
							<th>Rack</th>
							<th>Fornecedor</th>
							<th>Inv de compra</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan={11}></td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={11}>
								<div className={styles.btnsContainer}>
									{Object.entries(btns).map(
										([key, value]) => (
											<button
												key={key}
												className={styles.actionBtn}
												onClick={() => {
													if (
														typeof value ===
															'object' &&
														value.content
													) {
														setModalContent(
															value.content()
														)
														setIsOpen(true)
													}
												}}>
												<i
													className={
														typeof value ===
														'string'
															? value
															: value.icon
													}
												/>
												{key}
											</button>
										)
									)}
								</div>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	)
}

export default Dashboard
