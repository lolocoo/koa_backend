const router = require('koa-router')()
const config = require('../../config')
const UserControllers = require('../controllers/user')

router.prefix(`/${config.baseapi}`)
router.post('/login', UserControllers.login)
router.post('/reg', UserControllers.register)

module.exports = router
