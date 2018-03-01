const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const jwt = require('jsonwebtoken')
const cors = require('@koa/cors')
const routing = require('./src/routes')
const users = require('./src/routes/users')

const app = new Koa()

// error handler
onerror(app)
// middlewares
app
    .use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
    .use(cors({'origin': '*'}))
    .use(json())
    .use(logger())

app.use(require('koa-static')(__dirname + '/upload'))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routing(app)
app.use(users.routes(), users.allowedMethods())

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



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app 