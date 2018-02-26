const mysql = require('mysql')

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'koa',
  password: '123456',
  database: 'nodemyql'
})

let conf = {
  database: {
    host: '127.0.0.1',
    user: 'koa',
    password: '123456',
    database: 'nodemyql',
    type: 'mysql'
  },
  db: {
    // [param..] => values for sql place holder ? replacement
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
}

module.exports = conf