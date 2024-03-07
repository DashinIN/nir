const Router = require('express')
const orgsController = require('../controllers/orgsController.js')
const router = new Router()

router.get('/titles', orgsController.getAllTitles)
router.post('/values', orgsController.getFilterValues)
router.post('/filter', orgsController.getFilteredOrgs)
router.post('/filterCount', orgsController.getFilteredOrgsCount)
router.post('/sampleFieldsTitles', orgsController.getSampleFieldsHeaders)
router.put('/record/:id', orgsController.editOrgRecord)
router.delete('/record/:id', orgsController.deleteOrgRecord)
module.exports = router
