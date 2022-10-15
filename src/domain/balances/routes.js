const { Router } = require('express')

const controller = require('./controller')
const { getProfile } = require('../../middleware/getProfile')

const router = Router()

router.post('/deposit/:id', getProfile, controller.makeDeposit)

module.exports = router
