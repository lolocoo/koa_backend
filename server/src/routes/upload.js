const router = require('koa-router')()
const config = require('../../config')
const UploadControllers = require('../controllers/upload')

router.prefix(`/${config.baseapi}`)
router.post('/upload', UploadControllers.upload)

module.exports = router
