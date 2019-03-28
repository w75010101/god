let H = require('./lib')

let mongoose = require('mongoose')

let port = 5000

// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).then(res => {
// 	// console.log(res, 'sdfasf')
// }).catch(err => {
// 	console.log(err)
// });

H.createServer(9000)

H.registerRoutes([
  {
    url: '/index',
    method: 'GET',
    beforeHandler () {
      return false
    },
    handler (req, res) {
      res.$status(200).$json({
        login: 1
      })
    },
    onError (req, res, err) {
      res.$status(401).end('opps!you havenot login.')
    }
  },
  {
    url: '/redirect',
    method: 'GET',
    handler (req, res) {
      res.$redirect('/index')
    }
  }
])

H.run(_ => console.log(9000))
