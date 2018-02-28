const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const secret = 'De Profundis'
const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const { db } = require('../config')
const User = require('../models/user')

router.post('/login', async (ctx, next) => {
  let body = ctx.request.body
  let user = await User.findOne({where: { userName: body.userName }})
  let result = {
    success: false
  }
  if(user && bcrypt.compareSync(body.password, user.password)) {
    Object.assign(result, {
      success: true,
      token: jwt.sign(body, secret, { expiresIn: '1h' })
    })
  }
  ctx.body = result
})

router.post('/reg', async (ctx, next) => {
  let body = ctx.request.body
  let result = {
    success: false
  }
  let pwHash = bcrypt.hashSync(body.password, salt)
  let user = await User.findOrCreate({
    where: { userName: body.userName },
    defaults: { password: pwHash }
  })
  let isCreate = user[1]
  if (isCreate) {
    Object.assign(result, {
      success: true
    })
  }
  ctx.body = result
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
