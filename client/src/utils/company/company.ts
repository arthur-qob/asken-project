import { Participant, Item, Items } from '../types'

export class Company {
	public readonly id: string
	public name: string
	public participants: string[]
	public items: Items

	constructor(
		id: string,
		name: string,
		participants: string[],
		items: Items
	) {
		this.id = id
		this.name = name
		this.participants = participants
		this.items = items
	}

	setName(name: string): void {
		this.name = name
	}

	getName(): string {
		return this.name
	}

	// @ts-ignore
	addParticipant(participant: Participant): void {
		// do smth
	}

	getParticpants(): string[] {
		return this.participants
	}

	// @ts-ignore
	addItem(item: Item): void {
		// do smth
	}

	getItems(): Items {
		return this.items
	}
}
