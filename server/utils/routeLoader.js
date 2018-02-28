const glob = require('glob')

function loader(dirname) {
    return new Promise((resolve, reject) => {
        const routes = []
        glob(
            `${dirname}/*,`,
            { ignore: '**/index.js' },
            (err, files) => {
                console.log(files)
                if (err) {
                    return reject(err)
                }
                files.forEach(file => {
                   const route = require(file)
                   routes.push(route)
                })
                return resolve(routes)
            }
        )
    })
}
module.exports = loader