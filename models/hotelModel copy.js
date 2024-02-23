const mongoose = require('mongoose')


const reservationSchema = new mongoose.Schema({
	number: {
		type: Number,
		required: true,
	},
	capacity: {
		type: Number,
		required: true,
	},
	floor: {
		type: Number,
		required: true,
	},
	room_image: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	wifi: {
		type: Boolean,
		required: true,
	},
	parking: {
		type: Boolean,
		required: true,
	},
	breakfast: {
		type: Boolean,
		required: true,
	},
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation