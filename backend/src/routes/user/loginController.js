var loginController = {};
var ApiError = require('../../error/ApiError');
const ApiErrorNames = require('../../error/ApiErrorNames');

const jwt = require('jsonwebtoken')
const secret = 'De Profundis'
const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const User = require('../../models/user')

//获取用户
loginController.do = async (ctx, next) => {
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
}

module.exports = loginController;