const Router = require('express')
const orgsController = require('../controllers/orgsController.js')
const router = new Router()

router.get('/', orgsController.getAll)
router.get('/region', orgsController.getByRegion)

module.exports = router
