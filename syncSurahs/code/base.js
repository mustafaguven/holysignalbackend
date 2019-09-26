var config = require('./crypt.js');

var returnOK = function(result, callback) {
  return callback(null, {
    message: null,
    data: JSON.stringify(result),
    status: 1
  });
}

var returnError = function(err, callback) {
  return callback(null, {
    message: JSON.stringify(err),
    data: null,
    status: 0
  });
}

var quoteCorrector = function(str){
  return str.replace("'", "\\'");
}

module.exports =  {
  returnOK: returnOK,
  returnError: returnError,
  encrypt: config.encrypt,
  decrypt: config.decrypt,
  quoteCorrector: quoteCorrector
};
