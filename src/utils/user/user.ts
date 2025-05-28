export class User {
	constructor(
		public uid: string,
		public name: string,
		public email: string,
		public role: string,
		public createdAt: string
	) {
		this.uid = uid
		this.name = name
		this.email = email
		this.role = role
		this.createdAt = createdAt
	}

	setName(name: string): void {
		this.name = name
	}

	getName(): string {
		return this.name
	}

	setEmail(email: string): void {
		this.email = email
	}

	getEmail(): string {
		return this.email
	}

	setRole(role: string): void {
		this.role = role
	}

	getRole(): string {
		return this.role
	}

	setCreatedAt(createdAt: string): void {
		this.createdAt = createdAt
	}

	getCreatedAt(): string {
		return this.createdAt
	}
}
