const { Router } = require('express')

const controller = require('./controller')
const { getProfile } = require('../../middleware/getProfile')

const router = Router()

router.get('/unpaid', getProfile, controller.listUnpaid)
router.post('/:job_id/pay', getProfile, controller.payOne)

module.exports = router
