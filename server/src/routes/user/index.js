var router = require('koa-router')();

var loginController = require('./loginController');

// router.prefix('/user')

router.post('/login', loginController.do)

module.exports = router