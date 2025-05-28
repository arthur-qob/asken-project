export type Participant = {
	id: string
	name: string
	email: string
	phone: string
}

export type Item = {
	id: string
	name: string
	quantity: number
	price: number
	description: string
}

export type Items = Record<string, Item>
