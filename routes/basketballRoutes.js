const express = require('express')
const basketballController = require('../controllers/basketballController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

router.route('/top')
	.get(basketballController.getTop)

router.route('/top/:teamName')
	.get(basketballController.getTopByTeam)

router.route('/team/youngest')
	.get(basketballController.getYoungest)

router.route('/team/:teamName/members')
	.get(basketballController.getTeamMembers)

router.route('/participant/:id/card')
	.get(basketballController.getCard)

router.route('/participants')
	.post(requireAuth, basketballController.createParticipant)
	.get(basketballController.getParticipants)

module.exports = router
