const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('jsonwebtoken')
const cors = require('@koa/cors')

const app = new Koa()

// secret
const secret = 'De Profundis'

// authentication
// require('./routes/auth')

const index = require('./src/routes/index')
const upload = require('./src/routes/upload')
const users = require('./src/routes/users')
const api = require('./src/routes/api')

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(__dirname + '/upload'))

app.use(cors({
  'origin': '*'
}))
app.use(json())
app.use(logger())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes for login
app.use(index.routes(), index.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())

// Require token for now
// app.use(async (ctx, next) => {
//   let token = ctx.request.headers['x-access-token']
//   if (!token) {
//     ctx.body = {
//       "error" : {
//         "code": 401,
//         "message": "Unauthorized."
//       }
//     }
//   } else {
//     return next()
//   }
// })
// routes for website funcs
app.use(users.routes(), users.allowedMethods())
// routes for api funcs
app.use(api.routes(), api.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app