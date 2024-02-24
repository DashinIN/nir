const Router = require('express')
const SamplesController = require('../controllers/samplesController.js')
const router = new Router()

router.get('/', SamplesController.getAllSamples)
router.post('/', SamplesController.addSample)

module.exports = router
