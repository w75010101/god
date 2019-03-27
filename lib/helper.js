'use strict';

/**
 * this -> response
 */

const resHelpers = [

  function json (json) {
    this.setHeader('content-type', 'application/json;charset:utf-8');
    this.statusCode = 200;
    this.end(JSON.stringify(json))
  },

  function redirect (url) {
    this.statusCode = 301;
    this.setHeader('Location', url)
    this.end()
  },

  function status(code) {
    this.statusCode = code;
    return this
  }
]

module.exports = {
  resHelpers
}


