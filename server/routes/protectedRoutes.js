// routes/protectedRoutes.js
const express = require('express')
const authenticateFirebaseUser = require('../firebaseAuthMiddleware')

const router = express.Router()

router.get('/dashboard', authenticateFirebaseUser, (req, res) => {
	const user = req.user

	res.json({
		message: `Welcome ${user.name || user.email}!`,
		uid: user.uid,
		email: user.email
	})
})

router.get('/companies', authenticateFirebaseUser, (req, res) => {
	const user = req.user

	res.json({
		message: `Welcome ${user.name || user.email}!`,
		uid: user.uid,
		email: user.email
	})
})

router.get('/test', authenticateFirebaseUser, (req, res) => {
	const user = req.user

	res.json({
		message: `Welcome ${user.name || user.email}`,
		uid: user.uid,
		email: user.email
	})
})

module.exports = router
