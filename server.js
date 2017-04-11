const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, './src/template.html')
    // const publicPath = express.static(path.join(__dirname, './public'))

    // app.use('/public', publicPath)
    app.use(express.static('public'))
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}