var router = require('koa-router')();


router.post('/', async (ctx, next) => {
    ctx.body = 'this is a api car response'
  })
module.exports = router