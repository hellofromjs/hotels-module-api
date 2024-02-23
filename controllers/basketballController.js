const Participant = require("../models/participantModel")
const QueryBuilder = require("../utils/QueryBuilder")


exports.createParticipant = async (req, res) => {
	try {
		const participant = await Participant.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			age: req.body.age,
			team_name: req.body.team_name,
			rating: req.body.rating,
		})

		res.status(201).json({
			status: 'success',
			data: participant,
		})
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err,
		})
	}
}

exports.getParticipants = async (req, res) => {
	try {
		const participants = await new QueryBuilder(Participant.find(), req.query)
			.filter()
			.sort()
			.selectFields()
			.paginate()
			.dbQuery

		res.status(200).json({
			status: 'success',
			results: participants.length,
			data: participants,
		})

	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
}

exports.getCard = async (req, res) => {
	try {
		const participant = await Participant.findById(req.params.id)

		res.status(200).json({
			status: 'success',
			data: {
				first_name: participant.first_name,
				last_name: participant.last_name,
				age: participant.age,
				team_name: participant.team_name,
				rating: participant.rating,
			},
		})

	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
}

exports.getTeamMembers = async (req, res) => {
	try {
		const participants = await Participant.find({ team_name: req.params.teamName })

		res.status(200).json({
			status: 'success',
			results: participants.length,
			data: participants,
		})

	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
}

exports.getYoungest = async (req, res) => {
	try {
		const participants = await Participant.find({ age: { $lt: 21 } })

		res.status(200).json({
			status: 'success',
			results: participants.length,
			data: participants,
		})

	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
}

exports.getTopByTeam = async (req, res) => {
	try {
		const participants = await Participant
			.find({ team_name: req.params.teamName })
			.sort({ rating: -1 })
			.limit(10)

		res.status(200).json({
			status: 'success',
			results: participants.length,
			data: participants,
		})

	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
}

exports.getTop = async (req, res) => {
	try {
		const participants = await Participant
			.find()
			.sort({ rating: -1 })
			.limit(10)

		res.status(200).json({
			status: 'success',
			results: participants.length,
			data: participants,
		})

	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
}
