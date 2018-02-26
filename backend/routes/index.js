const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const secret = 'De Profundis'
const { db } = require('../config')

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: 'Koa2 Login Page'
  })
})

router.post('/login', async (ctx, next) => {
  let body = ctx.request.body
  ctx.body = {
    token: jwt.sign(body, secret, { expiresIn: '1h' })
  }
})

router.get('/logout', async (ctx, next) => {
  ctx.redirect('/login')
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    description: 'this cors 123'
  }
})

router.get('/vue', async (ctx, next) => {
  let users = await db.query('select * from users')
  console.log(users)
  ctx.body = {
    data: {
      users: users
    }
  }
})

module.exports = router
