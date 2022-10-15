const { Router } = require('express')

const controller = require('./controller')
const { getProfile } = require('../../middleware/getProfile')

const router = Router()

router.get('/best-profession', getProfile, controller.bestProfession)

module.exports = router
