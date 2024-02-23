const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { signToken } = require('../utils/utils')
const Hotel = require('../models/hotelModel')

const fs = require('node:fs');
const Reservation = require('../models/hotelModel copy');


exports.getAllRooms = async (req, res) => {

}

exports.getRoom = async (req, res) => {

}

exports.getAvailableRooms = async (req, res) => {

}

exports.reserveRoom = async (req, res) => {
    const room = await Hotel.findOne({ id: req.params.roomId })

    if (!room) {
        res.status(404).json({
			message: 'A room with this ID does not exist'
		})
    }

    const errorObj = {
        error: "Validation failed",
        fields: {}
    }

    if (!req.body.name) {
        errorObj.fields.name = 'The name field is required'
        res.status(422).json(errorObj)
    } else if (!req.body.address) {
        errorObj.fields.address = 'The address field is required'
        res.status(422).json(errorObj)
    } else if (!req.body.city) {
        errorObj.fields.city = 'The city field is required'
        res.status(422).json(errorObj)
    } else if (!req.body.checkin) {
        errorObj.fields.checkin = 'The checkin field is required'
        res.status(422).json(errorObj)
    } else if (!req.body.checkout) {
        errorObj.fields.checkout = 'The checkout field is required'
        res.status(422).json(errorObj)
    } else if (!req.body.zip) {
        errorObj.fields.zip = 'The zip field is required'
        res.status(422).json(errorObj)
    } else if (!req.body.country) {
        errorObj.fields.country = 'The country field is required'
        res.status(422).json(errorObj)
    }

    try {
		const participant = await Hotel.create({
			name: req.body.name,
			address: req.body.address,
			city: req.body.city,
			zip: req.body.zip,
			country: req.body.country,
            checkin: req.body.checkin,
            checkout: req.body.checkout,
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

exports.getReservations = async (req, res) => {

}

exports.deleteReservation = async (req, res) => {

}

exports.importData = async (req, res) => {
    try {
        const data = fs.readFileSync('/home/moksleivis/e/nodejs/hotels-module-api/data/data.csv', 'utf8');
        let lines = data.split("\n");
    
        const reservations = []

        for (const line of lines) {
            let data = line.split(",");

            let reservation = {
                number: parseInt(data[1]),
                capacity: parseInt(data[2]),
                floor: parseInt(data[3]),
                room_image: data[4],
                price: parseInt(data[5]),
                wifi: data[6].toLocaleLowerCase() === "true",
                parking: data[7].toLocaleLowerCase() === "true",
                breakfast: data[8].toLocaleLowerCase() === "true",
            }

            reservations.push(reservation)

            try{
                const document = await Reservation.create(reservation)
            } catch(err) {
                console.log(err.message)
            }
        }

        res.status(201).json({
            status: 'success',
            reservations
        })
    } catch (err) {
        console.error(err);
    }
}
