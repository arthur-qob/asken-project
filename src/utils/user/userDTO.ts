import { User } from './user'

export class UserDTO {
	#uid: string
	#name: string
	#email: string
	#role: string
	#createdAt: string

	constructor(
		uid: string,
		name: string,
		email: string,
		role: string,
		createdAt: string
	) {
		this.#uid = uid
		this.#name = name
		this.#email = email
		this.#role = role
		this.#createdAt = createdAt
	}

	getUid(): string {
		return this.#uid
	}

	getName(): string {
		return this.#name
	}

	getEmail(): string {
		return this.#email
	}

	getRole(): string {
		return this.#role
	}

	getCreatedAt(): string {
		return this.#createdAt
	}

	static fromUser(user: User): UserDTO {
		return new UserDTO(
			user.uid,
			user.name,
			user.email,
			user.role,
			user.createdAt
		)
	}

	toUser(): User {
		return new User(
			this.#uid,
			this.#name,
			this.#email,
			this.#role,
			this.#createdAt
		)
	}
}
