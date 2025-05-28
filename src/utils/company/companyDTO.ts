import { Items } from '../types'
import { Company } from './company'

export class CompanyDTO {
	#id: string
	#name: string
	#participants: string[]
	#items: Items

	constructor(
		id: string,
		name: string,
		participants: string[],
		items: Items
	) {
		this.#id = id
		this.#name = name
		this.#participants = participants
		this.#items = items
	}

	getId(): string {
		return this.#id
	}

	getCompanyName(): string {
		return this.#name
	}

	getParticipants(): string[] {
		return this.#participants
	}

	getCompanyItems(): Items {
		return this.#items
	}

	static fromCompany(company: Company): CompanyDTO {
		return new CompanyDTO(
			company.id,
			company.name,
			company.participants,
			company.items
		)
	}

	toCompany(): Company {
		return new Company(
			this.#id,
			this.#name,
			this.#participants,
			this.#items
		)
	}
}
