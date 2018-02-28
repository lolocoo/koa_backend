const mysql = require('mysql')

const database = {
  host: '127.0.0.1',
  user: 'koa',
  password: '123456',
  database: 'nodemyql',
  type: 'mysql'
}

const pool = mysql.createPool(database)

const db = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, results, fields) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
            connection.release()
          })
        }
      })
    })
  }
}

const baseapi = 'api'

module.exports = {
  database,
  db,
  baseapi
}