var config = require('./crypt.js');

var returnOK = function(result, callback) {
  return callback(null, {
    message: null,
    data: result,
    status: 1
  });
}

var returnError = function(err, callback, status) {
  return callback(null, {
    message: err,
    data: null,
    status: (status == null || status == 'undefined') ? 0 : status
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
