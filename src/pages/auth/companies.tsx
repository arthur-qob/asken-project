import { getCompanies } from '@/utils/companiesCRUD'
import { Company } from '@/utils/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { useCompany } from '@/contexts/CompanyContext'

const Companies = () => {
	const [companies, setCompanies] = useState<Company[] | null>(null)

	const navigate = useNavigate()

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const companiesData = await getCompanies()
				setCompanies(companiesData)
			} catch (error) {
				console.error('Error fetching companies:', error)
			}
		}

		fetchCompanies()
	}, [])

	useEffect(() => {
		if (companies?.length === 0) {
			setCompanies(null)
		}
	}, [companies])

	const testCompanies = {
		'Technicare USA': {
			name: 'Technicare USA',
			logo: 'technicare-logo.png',
			href: '/companies/technicare-usa'
		},
		'Implamed USA': {
			name: 'Implamed USA',
			logo: 'implamed-logo.png',
			href: '/companies/implamed-usa'
		},
		Hasten: {
			name: 'Hasten',
			logo: 'hasten-logo.png',
			href: '/companies/hasten'
		}
	}

	const { setSelectedCompany } = useCompany()

	return (
		<section className={styles.companiesContainer}>
			<h1>Choose a company</h1>
			{testCompanies ? (
				Object.values(testCompanies).map(
					(company: any, index: number) => (
						<button
							key={index}
							className={styles.companiesBtns}
							onClick={() => {
								setSelectedCompany(company.name)
								navigate('/dashboard')
							}}>
							<h3>{company.name}</h3>
							<i className='fa-solid fa-chevron-right'></i>
						</button>
					)
				)
			) : (
				<p>No test companies found</p>
			)}
		</section>
	)
}

export default Companies
