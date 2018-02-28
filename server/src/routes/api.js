var router = require('koa-router')();

var user_router = require('./user');
var car_router = require('./car');

//用户相关
router.use('/api/user', user_router.routes(), user_router.allowedMethods())
//车相关
router.use('/api/car', car_router.routes(), car_router.allowedMethods())

router.get('/api', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    description: 'this cors 123'
  }
})
module.exports = router