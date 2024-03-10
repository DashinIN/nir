const Router = require('express')
const SamplesController = require('../controllers/samplesController.js')
const checkRoles = require('../middleware/checkRolesMiddleware.js')
const router = new Router()

router.get('/', SamplesController.getAllSamples)
router.post('/', checkRoles(['ADMIN']), SamplesController.addSample)

module.exports = router
