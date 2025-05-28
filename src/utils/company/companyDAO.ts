import ModelError from '../modelError'
import { Company } from './company'
import { CompanyDTO } from './companyDTO'
import { fsdb as db } from '@/utils/config/firebase'
import {
	collection,
	getDocs,
	getDoc,
	setDoc,
	doc,
	updateDoc,
	deleteDoc
} from 'firebase/firestore'

export class CompanyDAO {
	static collectionName = 'companies'

	static async getAll(): Promise<Company[]> {
		try {
			const colRef = collection(db, this.collectionName)
			const snapshot = await getDocs(colRef)
			const companies: Company[] = []

			snapshot.forEach((docSnap) => {
				const data = docSnap.data()
				const dto = new CompanyDTO(
					data.id,
					data.name,
					data.participants,
					data.items
				)
				companies.push(dto.toCompany())
			})

			return companies
		} catch (err) {
			throw new ModelError(`Error fetching companies: ${err}`)
		}
	}

	static async getById(id: string): Promise<Company | null> {
		try {
			const docRef = doc(db, this.collectionName, id)
			const snap = await getDoc(docRef)

			if (!snap.exists()) return null

			const data = snap.data()
			const dto = new CompanyDTO(
				data.id,
				data.name,
				data.participants,
				data.items
			)
			return dto.toCompany()
		} catch (err) {
			throw new ModelError(`Error fetching company with ID ${id}: ${err}`)
		}
	}

	static async add(company: Company): Promise<void> {
		try {
			const dto = CompanyDTO.fromCompany(company)
			const docRef = doc(db, this.collectionName, company.id)
			await setDoc(docRef, {
				id: dto.getId(),
				name: dto.getCompanyName(),
				participants: dto.getParticipants(),
				items: dto.getCompanyItems()
			})
		} catch (err) {
			throw new ModelError(`Error adding company: ${err}`)
		}
	}

	static async update(company: Company): Promise<void> {
		try {
			const dto = CompanyDTO.fromCompany(company)
			const docRef = doc(db, this.collectionName, company.id)
			await updateDoc(docRef, {
				name: dto.getCompanyName(),
				participants: dto.getParticipants(),
				items: dto.getCompanyItems()
			})
		} catch (err) {
			throw new ModelError(`Error updating company: ${err}`)
		}
	}

	static async delete(id: string): Promise<void> {
		try {
			const docRef = doc(db, this.collectionName, id)
			await deleteDoc(docRef)
		} catch (err) {
			throw new ModelError(`Error deleting company: ${err}`)
		}
	}
}
