const {
  database
} = require('../config')

const ODM = require('sequelize')
const sqlz = new ODM(
  database.database,
  database.user,
  database.password,
  {
    host: database.host,
    dialect: database.type,
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000
    }
  }
)

module.exports = { ODM, sqlz }