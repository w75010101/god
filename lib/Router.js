
configureRoutes = function (req, res, options) {
  options.forEach(option => {
    if (
      req.method === option.method.toUpperCase() &&
      req.url === option.url
    ) {
      if (option.beforeHandler) {
        (async() => {
          let bh = await option.beforeHandler(req, res)
          if (!bh) {
            option.onError(req, res, new Error('未通过的中间件'))
          } else {
            option.handler(req, res)
          }
        })()
      } else {
        option.handler(req, res)
      }
    }
  })
}

module.exports = configureRoutes