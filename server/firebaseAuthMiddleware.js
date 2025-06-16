const admin = require('./firebaseAdmin')

const authenticateFirebaseUser = async (req, res, next) => {
	const authHeader = req.header('Authorization')

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Unauthorized: Missing token' })
	}

	const idToken = authHeader.replace('Bearer ', '')

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken)
		req.user = decodedToken
		next()
	} catch (error) {
		console.error('Firebase token verification failed', error)
		res.status(401).json({ message: 'Unauthorized: Invalid token' })
	}
}

module.exports = authenticateFirebaseUser
