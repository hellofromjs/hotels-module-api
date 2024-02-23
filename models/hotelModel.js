const mongoose = require('mongoose')


const hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	zip: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	checkin: {
		type: String,
		required: true,
	},
	checkout: {
		type: String,
		required: true,
	},
})

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel