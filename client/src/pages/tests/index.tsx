import { useUser } from '@/contexts/userContext'
import { useEffect } from 'react'

export const TestPage = () => {
	const { getFreshToken } = useUser()

	const fetchTest = async () => {
		const token = await getFreshToken()

		const res = await fetch('http://localhost:3000/api/test', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		if (res.status === 401) {
			console.warn('Access not authorized')
			return <h1>401 - Access not authorized</h1>
		} else {
			const data = await res.json()
			console.log(data)
		}
	}

	useEffect(() => {
		fetchTest()
	}, [])

	return <h1>Test Page</h1>
}
