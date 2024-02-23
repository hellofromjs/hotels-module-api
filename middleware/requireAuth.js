const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User = require('../models/userModel')


module.exports = async (req, res, next) => {
	try {
		let token

		// get auth token
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1]
		}

		if (!token) {
			throw new Error('User not authenticated')
		}

		// token verification
		const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

		// check if current user exists
		const currentUser = await User.findById(decoded.id)
		if (!currentUser) {
			throw new Error("user doesn't exist")
		}

		if (currentUser.accessToken != token) {
			throw new Error('user is not logged in')
		}

		// check if user changed password after token was issued
		if (currentUser.changedPasswordAfter(decoded.iat)) {
			throw new Error('user changed password, token invalid')
		}

		// access granted
		req.user = currentUser

		next()
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			error: err.message
		})
	}
}