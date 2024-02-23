const Router = require('express')
const router = new Router()
const orgsRouter = require('./orgsRouter')

router.use('/orgs', orgsRouter)

module.exports = router
