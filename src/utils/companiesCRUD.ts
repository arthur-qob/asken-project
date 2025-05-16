import {
	collection,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	doc,
	getDoc
} from 'firebase/firestore'
import { fsdb as db } from '@/config/firebase'
import { Company } from './types'

const companiesRef = collection(db, 'companies')

export const createCompany = async (
	company: Omit<Company, 'id' | 'createdAt'>
) => {
	return await addDoc(companiesRef, {
		...company,
		createdAt: new Date().toISOString().split('T')[0]
	})
}

export const getCompanies = async () => {
	const snapshot = await getDocs(companiesRef)
	try {
		const companies = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}))

		return companies as Company[]
	} catch (error) {
		console.error('Error fetching companies:', error)
		return null
	}
}

export const getCompanyById = async (id: string) => {
	const companyDoc = doc(db, 'companies', id)
	const snapshot = await getDoc(companyDoc)
	if (snapshot.exists()) {
		return {
			id: snapshot.id,
			...snapshot.data()
		} as Company
	} else {
		return false
	}
}

export const updateCompany = async (id: string, name: string) => {
	const companyDoc = doc(db, 'companies', id)
	return await updateDoc(companyDoc, { name })
}

export const deleteCompany = async (id: string) => {
	const companyDoc = doc(db, 'companies', id)
	return await deleteDoc(companyDoc)
}
