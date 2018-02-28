const router = require('koa-router')()

// router.prefix('/users')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    user: ctx
  })
})

router.get('/bar', function (ctx, next) {
  ctx.body = {
    test: 'this is a users/bar response'
  }
})

module.exports = router
