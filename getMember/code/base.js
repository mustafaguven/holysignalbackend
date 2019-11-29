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

var getCreateDate = function getCreateDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();
    var HH  = date.getHours().toString();
    var MM  = date.getMinutes().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]) + (HH[1]?HH:"0"+HH[0]) + (MM[1]?MM:"0"+MM[0]);
};

module.exports =  {
  returnOK: returnOK,
  returnError: returnError,
  encrypt: config.encrypt,
  decrypt: config.decrypt,
  quoteCorrector: quoteCorrector,
  getCreateDate: getCreateDate
};
