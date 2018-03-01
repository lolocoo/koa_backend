const ODM = require('sequelize')
const config = require('../../config')

const sqlz = new ODM(
    config.mysql.db,
    config.mysql.user,
    config.mysql.password, {
        host: config.mysql.host,
        dialect: config.mysql.type,
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000
        }
    }
)

module.exports = {
    ODM,
    sqlz
}