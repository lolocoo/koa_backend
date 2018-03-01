const bcrypt = require('bcrypt')

module.exports = {
    bhash(str) {
        return bcrypt.hashSync(str, 10)
    },
    bcompare(str, hash) {
        return bcrypt.compareSync(str, hash)
    }
}