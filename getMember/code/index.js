var base = require('./base.js');
var db = require('./db.js');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("member is getting");
  let result;
  try {
    let decryptedToken = base.decrypt(event.token).split("::")
    let email = decryptedToken[0]
    let password = decryptedToken[1]

    result = await getMember([email, password]);
    if(typeof result[0] !== 'undefined'){
      result = result[0];
      base.returnOK(result, callback);
    } else {
      base.returnError("mistaken email or password", callback);
    }

  } catch (err) {
    base.returnError(err.message, callback);
    console.log(err)
  }
};

let getMember = async (email, password) => {
  return db.execSqlWithParams("SELECT sessionNo FROM holysignaldb.Member WHERE email = ? and password = ?", email, password);
};
