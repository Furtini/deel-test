const { Router } = require('express')

const controller = require('./controller')
const { getProfile } = require('../../middleware/getProfile')

const router = Router()

router.get('/unpaid', getProfile, controller.listUnpaid)

module.exports = router
