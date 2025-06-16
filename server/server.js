const express = require('express')
const cors = require('cors')
const protectedRoutes = require('./routes/protectedRoutes')

const app = express()

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true
	})
)

app.use(express.json())

// Mount protected routes
app.use('/tokenVerification', protectedRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
