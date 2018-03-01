const User = require('../models/user')
const tools = require('../utils/tools')
const jwt = require('jsonwebtoken')
const config = require('../../config')

class UserControllers {
    async login(ctx) {
        let body = ctx.request.body
        let user = await User.findOne({where: { userName: body.userName }})
        let result = {
          success: false
        }
        if (user && tools.bcompare(body.password, user.password)) {
            Object.assign(result, {
                success: true,
                token: jwt.sign(body, config.secret, { expiresIn: '1h' })
            })
        }
        ctx.body = result
    }
    async register(ctx, next) {
        let body = ctx.request.body
        let result = {
          success: false
        }
        let pwHash = tools.bhash(body.password)
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
      }
}

module.exports = new UserControllers()