const routesLoader = require('../utils/routesLoader')

function routing(app) {
    routesLoader(`${__dirname}`)
        .then(files => {
            files.forEach(route => {
                if (typeof(route.routes) != undefined) {
                    app.use(route.routes())
                       .use(route.allowedMethods({ throw: true }))
                }
            })
        }).catch(err => {
            console.log('error')
        })
}
module.exports = routing