const routesLoader = require('../utils/routeLoader')

module.exports = app => {
    routesLoader(`${__dirname}`)
        .then(files => {
            files.forEach(route => {
                app
                    .use(route.routes())
                    .use(
                        route.allowedMethods({
                            throw: true
                        })
                    )
            })
        })
}