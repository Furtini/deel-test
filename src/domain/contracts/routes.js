const { Router } = require('express')

const controller = require('./controller')
const { getProfile } = require('../../middleware/getProfile')

const router = Router()

router.get('/:id', getProfile, controller.show)
router.get('/', getProfile, controller.listActive)

module.exports = router
