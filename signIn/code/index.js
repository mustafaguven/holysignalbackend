var base = require('./base.js');
var db = require('./db.js');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("sign in...");
  let result;
  try {
    let email = event.body.email
    let password = base.encrypt(event.body.password)
    let sessionNo = event.body.sessionno
    let phoneBrand = event.headers.phonebrand
    let phoneModel = event.headers.phonemodel

    let result = await getMember([email, password]);
    result = result[0]
    let newSessionChangeCount = 0
    if((typeof result !== 'undefined') && result != null){
      newSessionChangeCount = result.sessionChangeCount
      if(phoneBrand != result.phoneBrand || phoneModel != result.phoneModel){
        newSessionChangeCount = newSessionChangeCount + 1
      }
    } else {
      base.returnError("Mistaken email or password", callback);
      return
    }

    if(newSessionChangeCount == 1){
      base.returnError("You are changing your stored phone, this can be only 1 time in a year for security reasons. Do you want to change your stored phone", callback, 102);
      return
    } else if (newSessionChangeCount > 2) {
      base.returnError("You have changed your stored phone than 2 times in a year, this is invalid for security reasons. Please contact us via communication screen", callback, 103);
      return
    }

    if(sessionNo != result.sessionNo){
      base.returnError("Session number is different", callback, 101);
      return
    }

    result = {
        "name": result.name,
        "surname": result.surname,
        "token": base.encrypt(email + "::" + password + "::" + sessionNo)
      }
    base.returnOK(result, callback);
  } catch (err) {
    base.returnError(err.message, callback);
    console.log(err)
  }
};

let getMember = async (email, password) => {
  return db.execSqlWithParams("SELECT * FROM holysignaldb.Member WHERE email = ? and password = ?", email, password);
};
