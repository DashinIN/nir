const Router = require('express')
const orgsController = require('../controllers/orgsController.js')
const router = new Router()

router.get('/', orgsController.getAll)
router.get('/titles', orgsController.getAllTitles)
router.post('/values', orgsController.getFilterValues)
router.post('/filter', orgsController.getFilteredOrgs)
router.post('/filterCount', orgsController.getFilteredOrgsCount)
router.post('/sampleFieldsTitles', orgsController.getSampleFieldsHeaders)
router.get('/region', orgsController.getByRegion)

module.exports = router
