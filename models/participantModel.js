const mongoose = require('mongoose')


const alphabetRegex = /^[a-zA-Z\s]+$/
const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/

const participantSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'Participant must have a first name'],
		min: [2, 'First name must be at longer than 2 characters'],
		validate: {
			validator: function (el) {
				return alphabetRegex.test(el)
			},
			message: "First name can only contain letters and spaces",
		},
	},
	last_name: {
		type: String,
		required: [true, 'Participant must have a first name'],
		min: [2, 'Last name must be at longer than 2 characters'],
		validate: {
			validator: function (el) {
				return alphabetRegex.test(el)
			},
			message: "Last name can only contain letters and spaces",
		},
	},
	age: {
		type: Number,
		min: [18, 'Age must be 18 or above'],
		max: [40, 'Age must be 40 or below'],
		required: [true, 'Participant must have an age'],
	},
	team_name: {
		type: String,
		required: [true, 'Participant must have a team name'],
		validate: {
			validator: function (el) {
				return alphaNumericRegex.test(el)
			},
			message: "Team name can only contain letters, numbers and spaces",
		},
	},
	rating: {
		type: Number,
		required: [true, 'Participant must have a rating'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	}
})

const Participant = mongoose.model('Participant', participantSchema)

module.exports = Participant