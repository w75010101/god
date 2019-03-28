const http = require('http');
const configureRoutes = require('./Router');
const { statusHelper } = require('./helper');

function H () {

}

function App (params) {
  this.server = params.server || null;
  this.routes = params.routes || [];
  this.port = params.port || null;
}

H.registerRoutes = function (opts) {
  /**
   * 设计方向
   * ① opt是一个对象，以url为key，其他配置是value
   * ② opt是一个数组，以数组中的对象'url'为url，其他配置是value
   */
  if (!Array.isArray(opts) && typeof opts === 'object') {
    let routerArray = [];
    Object.keys(opts).forEach(url => {
      let tmp = opts[url];
      let u = { url }
      routerArray.push(Object.assign(tmp, u))
    })
    H._app.routes = routerArray
  } else {
    H._app.routes = opts
  }
};

function _handleRoute (req, res) {
  /**
   * 设计方向
   * ① 每一个请求作比对，是否可以接受当前路由配置的handler
   * ② 满足则执行，提供上下文 this.ctx.req // res
   * ③ 提供前置handler用于处理非逻辑内容，如校验，工具函数
   */
  configureRoutes(req, res, H._app.routes)
}

H.createServer = function (opt) {
  H._app = new App({port: typeof opt === 'number' ? opt : opt.port});
};

H.run = function () {
  H._app.server = http.createServer(_handleRoute).listen(H._app.port, ...arguments);
  return H._app.server
};

App.prototype.use = function (url, handler) {
  routesStack.push({
    type: 'middle',
    path: url,
    handler
  })
}

App.prototype.get = function (url, handler) {
  routesStack.push({
    type: 'route',
    url,
    method: 'GET',
    handler
  })
}

module.exports = H;
