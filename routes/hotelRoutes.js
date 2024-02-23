const express = require('express')
const basketballController = require('../controllers/hotelController')
// const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

router.route('/import')
	.get(basketballController.importData)

router.route('/rooms')
	.get(basketballController.getAllRooms)

router.route('/rooms/:roomId')
	.get(basketballController.getRoom)

router.route('/rooms/avialibility/checkin/:checkindate/checkout/:checkout-date')
	.get(basketballController.getAvailableRooms) 

router.route('/rooms/:roomId/reservation')
	.post(basketballController.reserveRoom)

router.route('/reservations')
	.post(basketballController.getReservations)

router.route('/reservations/:reservationId/cancel')
	.post(basketballController.deleteReservation)

module.exports = router