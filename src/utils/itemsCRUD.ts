import { fsdb as db } from '@/config/firebase'
// firestoreHelpers.ts
import {
	doc,
	setDoc,
	addDoc,
	updateDoc,
	collection,
	arrayUnion,
	query,
	where,
	getDocs
} from 'firebase/firestore'

// types.ts

export type Company = {
	name: string
	itemIds: string[]
}

export type Item = {
	name: string
	price: number
	companyId: string
}

export const addCompany = async (companyName: string) => {
	const companyRef = await addDoc(collection(db, 'Companies'), {
		name: companyName,
		itemIds: []
	})

	console.log('New company ID:', companyRef.id)
	return companyRef.id
}

export const addItemToCompany = async (
	itemData: Omit<Item, 'companyId'>,
	companyId: string
) => {
	const itemRef = await addDoc(collection(db, 'Items'), {
		...itemData,
		companyId
	})

	const generatedItemId = itemRef.id

	const companyRef = doc(db, 'Companies', companyId)
	await updateDoc(companyRef, {
		itemIds: arrayUnion(generatedItemId)
	})

	return generatedItemId
}

export const getItemsByCompany = async (companyId: string): Promise<Item[]> => {
	const itemsRef = collection(db, 'Items')
	const q = query(itemsRef, where('companyId', '==', companyId))
	const snapshot = await getDocs(q)

	return snapshot.docs.map((doc) => doc.data() as Item)
}
