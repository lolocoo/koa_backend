const { ODM, sqlz } = require('./sqlz')

const User = sqlz.define('user', {
    userName: {
        type: ODM.STRING
    },
    password: {
        type: ODM.STRING
    }
})

User.sync({force: true})
.then(() => {
   return User.bulkCreate(
       [
            {
                userName: 'koa',
                password: '1qazse4'
            },
            {
                userName: 'java',
                password: 'plmnji9'
            },
            {
                userName: 'python',
                password: 'zenofpython'
            }
       ]
    )
})