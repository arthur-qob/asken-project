export type Participant = {
	id: string
	name: string
	email: string
	phone: string
}

export type Items = {
	[key: string]: {
		ref: string
		descripton: string
		qtyPurchased: number
		qtyAvailable: number
		qtyToBeReceived: number
		invNo: string
	}
}

export type Item = {
	id: string
	name: string
	quantity: number
	price: number
	description: string
}
