const os = require('os')
const path = require('path')
const fs = require('fs')
const router = require('koa-router')()
const Busboy = require('busboy')

function mkdirsSync(dirname) {
  if ( fs.existsSync(dirname) ) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

function getSuffixName(filename) {
  return filename.split('.').pop()
}

function upload(ctx, opts) {
  let { req, res }  = ctx
  let busboy = new Busboy({headers: req.headers})
  let [fileType = 'common'] = [opts.fileType]
  let filePath = path.join(opts.path, fileType)
  let mkdirResult = mkdirsSync(filePath)
  let result = {
    success: false,
    message: '',
    data: []
  }
  return new Promise((resolve, reject) => {
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      let fileName = [new Date().valueOf().toString(16), Math.random().toString(16).substr(2)].join('') + '.' + getSuffixName(filename)
      let _path = path.join(filePath, fileName)
      let saveTo = path.join(_path)

      file.pipe(fs.createWriteStream(saveTo))
      file.on('end', () => {
        result.success = true
        result.data.push(fileName)
      })
    })

    busboy.on('finish', () => {
      resolve(result)
    })
    busboy.on('error', err => {
      reject(err)
    })
    req.pipe(busboy)
  })
}

router.post('/upload', async (ctx, next) => {
  let serverPath = path.join(__dirname, '../upload')
  let result = await upload(ctx, {
    path: serverPath
  })
  ctx.body = result
})

module.exports = router
