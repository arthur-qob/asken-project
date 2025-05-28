import { get, query, ref } from 'firebase/database'
import ModelError from '../modelError'

export class UserDAO {
	static connection: any = null

	constructor() {
		this.getConnection()
	}

	async getConnection(): Promise<any> {
		if (!UserDAO.connection) {
			UserDAO.connection = new Promise((res, rej) => {
				const { rtdb } = require('@/utils/config/firebase')
				const db = rtdb

				if (db) {
					res(db)
				} else {
					rej(
						new ModelError(
							'Could not establish connection to Database'
						)
					)
				}
			})
		}

		return UserDAO.connection
	}

	async getUserByUid(uid: string): Promise<any> {
		const dbConnection = await this.getConnection()

		return new Promise((res, rej) => {
			let userRef = ref(dbConnection, 'users/' + uid)
			let srch = query(userRef)
			let rslt = get(srch)

			rslt.then((dataSnapshot) => {
				let userSnapshot = dataSnapshot.val()

				if (!userSnapshot) {
					rej(
						new ModelError(
							'Could not find user by the provided uid.'
						)
					)
				}

				res(userSnapshot)
			})
		})
	}

	async getAllUsers(): Promise<any> {}
}
