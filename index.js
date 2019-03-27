let http = require('http');
let { onRunning, Router } = require('./util.js')
require('./lib')
let port = 5000

http.createServer(app).listen(port, onRunning(port))

function app(req, res) {
	Router.configure(req, res, [
		{
			url: '/index',
			method: 'GET',
			beforeHandler () {

			},
			handler () {
				this.res.$status(200).$json({
					login: 1
				})
			},
			onError (err) {
				this.res.$status(401).end('opps!you havenot login.')
			}
		},
		{
			url: '/redirect',
      method: 'GET',
			handler () {
				this.res.$redirect('/index')
			}
		}
	])
}
