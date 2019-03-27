function onRunning(port) {
	console.log(port)
}

const methods = [
'GET', 'POST', 'DELETE', 'PUT'
]

function Router () {

}

function createError (code, message) {
	let e = new Error();
	e.code = code;
	e.message = message
	return e
}

Router.configura = function (req, res, options) {
	let ctx = {req, res}
	options.forEach(option => {
		if (req.method === option.method.toUpperCase()) {
			if (option.beforeHandler) {
				if (option.beforeHandler.call(ctx)) {
					option.handler.call(ctx)
				} else {
					let error = createError('__CANNOT_BEFORE_MIDDLEWARE__', '未通过的中间件')
					if (option.onError) {
						option.onError.call(ctx, error)
					} else {
						throw error
					}
				}
			}
		}
	})
}

module.exports = {
	onRunning, Router
}