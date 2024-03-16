const Router = require('express')
const SamplesController = require('../controllers/samplesController.js')
const checkRoles = require('../middleware/checkRolesMiddleware.js')
const router = new Router()

router.get('/', SamplesController.getAllSamples)
router.get('/:id', SamplesController.getSample)
router.post('/', checkRoles(['ADMIN']), SamplesController.addSample)
router.put('/:id', checkRoles(['ADMIN']), SamplesController.editSample)
router.delete('/:id', checkRoles(['ADMIN']), SamplesController.deleteSample)

module.exports = router
