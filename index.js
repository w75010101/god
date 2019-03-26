let http = require('http');
let port = 2000

http.createServer(app).listen(port, onRunning(port))

function app(req, res) {
	res.writeHead(200, {
		'content-type': 'text/html;charset=utf-8'
	})
	res.write('<h1>首页</h1>')
	res.end()
}

function onRunning(port) {
	console.log(port)
}