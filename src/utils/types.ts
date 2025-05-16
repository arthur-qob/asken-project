export type Company = {
	id?: string
	name: string
	createdAt: Date
}

export type Item = {
	id?: string
	name: string
	quantity: number
	companyId: string
	createdAt: Date
}
