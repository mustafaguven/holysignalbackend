var crypto = require('crypto');
var algorithm = 'aes256';
var key = 'rvtbynumio';

var encrypt = function(text) {
  var cipher = crypto.createCipher(algorithm, key);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

var decrypt = function(text) {
  var decipher = crypto.createDecipher(algorithm, key);
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
}

module.exports =  {
  encrypt: encrypt,
  decrypt: decrypt
};
