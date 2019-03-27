'use strict';
const Response = require('http').ServerResponse;

const { resHelpers } = require('./helper');


/**
 * load helpers
 */

resHelpers.forEach(helper => {
  Response.prototype['$' + helper.name] = helper
})