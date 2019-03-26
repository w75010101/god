let http = require('http');
let port = 2000

http.createServer(app).listen(port, onRunning(port))

function app(req, res) {
	res.writeHead(200, {
		'content-type': 'text/html;charset=utf-8'
	})
	res.write('<h1>首页</h1>')
	res.write('<h3>首页2</h3>')
	res.end()
}

function onRunning(port) {
	console.log(port)
}