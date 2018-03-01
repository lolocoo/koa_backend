const glob = require('glob')
const excludeFiles = 'api auth upload'.split('')

function loader(dirname) {
    return new Promise((resolve, reject) => {
        const routes = []
        glob(
            `${dirname}/*`, {
                ignore: '**/index.js'
            },
            (err, files) => {
                if (err) {
                    return reject(err)
                }
                files.forEach(file => {
                    console.log(file)
                    const route = require(file)
                    routes.push(route)
                })
                return resolve(routes)
            }
        )
    })
}
module.exports = loader