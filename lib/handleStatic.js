const fs = require('fs');

module.exports = function (url) {
  let ws = fs.createWriteStream(url);

}