export class User {
	public readonly uid: string
	public name: string
	public email: string
	public role: string
	public createdAt: string

	constructor(
		uid: string,
		name: string,
		email: string,
		role: string,
		createdAt: string
	) {
		this.uid = uid
		this.name = name
		this.email = email
		this.role = role
		this.createdAt = createdAt
	}
}
