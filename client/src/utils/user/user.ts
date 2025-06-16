export class User {
	#uid
	#name
	#email
	#role
	#createdAt
	#photoUrl

	constructor(
		uid: string,
		name: string,
		email: string,
		role: string,
		createdAt: string,
		photoUrl: string
	) {
		this.#uid = uid
		this.#name = name
		this.#email = email
		this.#role = role
		this.#createdAt = createdAt
		this.#photoUrl = photoUrl
	}

	setUid(uid: string): void {
		this.#uid = uid
	}

	getUid(): string {
		return this.#uid
	}

	setName(name: string): void {
		this.#name = name
	}

	getName(): string {
		return this.#name
	}

	setEmail(email: string): void {
		this.#email = email
	}

	getEmail(): string {
		return this.#email
	}

	setRole(role: string): void {
		this.#role = role
	}

	getRole(): string {
		return this.#role
	}

	setCreatedAt(createdAt: string): void {
		this.#createdAt = createdAt
	}

	getCreatedAt(): string {
		return this.#createdAt
	}

	setPhotoUrl(photoUrl: string): void {
		this.#photoUrl = photoUrl
	}

	getPhotoUrl(): string {
		return this.#photoUrl
	}
}
