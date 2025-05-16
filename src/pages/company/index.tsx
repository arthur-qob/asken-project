// import { getCompanyById } from '@/utils/companiesCRUD'
import { useParams } from 'react-router-dom'

const Company = () => {
	const companyName = useParams()

	return (
		<section>
			<h1>{companyName.id}</h1>
		</section>
	)
}

export default Company
