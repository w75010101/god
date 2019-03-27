function onRunning(port) {
	console.log(port)
}

const methods = [
'GET', 'POST', 'DELETE', 'PUT'
]

const status = {
	errAuth: '__ERROR_AUTH__'
}


function Router () {

}

function createError (code, message) {
	let e = new Error();
	e.code = code;
	e.message = message
	return e
}

function handleError (option, error, ctx) {
  if (option.onError) {
    option.onError.call(ctx, error)
  } else {
    throw error
  }
}

Router.configure = function (req, res, options) {
	let ctx = {req, res};
	options.forEach(option => {
		if (
			req.method === option.method.toUpperCase() &&
			req.url === option.url
		) {
			if (option.beforeHandler && !option.beforeHandler.call(ctx)) {
        handleError(option, createError(status['errAuth'], '未通过的中间件'), ctx)
      } else {
				option.handler.call(ctx)
			}
		}
	})
}

module.exports = {
	onRunning, Router
}