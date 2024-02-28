const Router = require('express')
const orgsController = require('../controllers/orgsController.js')
const router = new Router()

router.get('/', orgsController.getAll)
router.get('/titles', orgsController.getAllTitles)
router.post('/values', orgsController.getFilterValues)
router.post('/filter', orgsController.getFilteredOrgs)
router.get('/region', orgsController.getByRegion)

module.exports = router
