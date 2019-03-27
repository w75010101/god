let http = require('http');
let { onRunning, Router } = require('./util.js')
let port = 2000

http.createServer(app).listen(port, onRunning(port))



function app(req, res) {
	Router.configura(req, res, [
	{
		url: '/index',
		method: 'GET',
		handler () {
			this.res.end('ok')
		},
		beforeHandler () {
			return false
		},
		onError (err) {
			this.res.end('opps!you havenot login.')
		}
	}
	])
}
