const { ODM, sqlz } = require('../utils/store')

const User = sqlz.define('user', {
    userName: {
        type: ODM.STRING
    },
    password: {
        type: ODM.STRING
    }
})

module.exports = User