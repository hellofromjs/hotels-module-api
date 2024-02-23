const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { signToken } = require('../utils/utils')


exports.register = async (req, res) => {
	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
		})

		const token = jwt.sign(
			{ id: newUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN }
		)

		await User.updateOne({ _id: newUser._id }, {
			accessToken: token
		})

		res.status(201).json({
			status: 'success',
			data: newUser,
			token,
		})
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		})
	}
}

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body

		// check that email and password has been provided
		if (!email || !password) {
			throw new Error('Please provide email and password')
		}

		// check if user exist and password is correct
		const user = await User.findOne({ email }).select('+password')
		if (!user || !(await user.correctPassword(password, user.password))) {
			throw new Error('Incorrect email or password')
		}

		// send token to client
		const token = signToken(user.id)

		await User.updateOne({ _id: user._id }, {
			accessToken: token
		})

		res.status(201).json({
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
			token,
		})
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		})
	}
}

exports.logout = async (req, res) => {
	try {
		await User.findOneAndUpdate({ _id: req.user._id }, { accessToken: null })

		res.status(200).json({
			status: 'success'
		})
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		})
	}
}
