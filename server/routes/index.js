const Router = require('express')
const router = new Router()
const orgsRouter = require('./orgsRouter')
const samplesRouter = require('./samplesRouter')

router.use('/orgs', orgsRouter)
router.use('/samples', samplesRouter)

module.exports = router
