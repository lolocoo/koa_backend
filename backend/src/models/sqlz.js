
const ODM = require('sequelize')
const config = require('config')
const dbConfig = config.db

const sqlz = new ODM(
  dbConfig.dbname,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.type,
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000
    }
  }
)

module.exports = { ODM, sqlz }