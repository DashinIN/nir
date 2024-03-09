const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const orgsRouter = require('./orgsRouter')
const samplesRouter = require('./samplesRouter')

router.use('/user', userRouter)
router.use('/orgs', orgsRouter)
router.use('/samples', samplesRouter)

module.exports = router
