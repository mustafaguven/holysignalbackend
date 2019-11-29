var base = require('./base.js');
var db = require('./db.js');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("updateSessionNo...");
  let result;
  try {
    let email = event.body.email
    let password = base.encrypt(event.body.password)
    let sessionNo = event.body.sessionno
    let phoneBrand = event.headers.phonebrand
    let phoneModel = event.headers.phonemodel

    let result = await getMember([email, password]);
    let newSessionChangeCount = 0
    result = result[0]

    if((typeof result !== 'undefined') && result != null){
      newSessionChangeCount = result.sessionChangeCount
      if(phoneBrand != result.phoneBrand || phoneModel != result.phoneModel){
        newSessionChangeCount = newSessionChangeCount + 1
      }
    } else {
      base.returnError("Mistaken email or password", callback);
      return
    }

    if(newSessionChangeCount > 2){
      base.returnError("You have changed your phone than 2 times in a year, update can not be done, please contact us", callback, 104);
      return
    }

    await updateSessionNo([sessionNo, newSessionChangeCount, phoneBrand, phoneModel, email, password]);
    result = await getMember([email, password]);
    result = result[0];
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

let updateSessionNo = async (sessionNo, newSessionChangeCount, phoneBrand, phoneModel, email, password) => {
  return db.execSqlWithParams("UPDATE holysignaldb.Member SET sessionNo = ?, sessionChangeCount = ?, phoneBrand = ?, phoneModel = ? WHERE email = ? and password = ?", sessionNo, newSessionChangeCount, phoneBrand, phoneModel, email, password);
};

let getMember = async (email, password) => {
  return db.execSqlWithParams("SELECT * FROM holysignaldb.Member WHERE email = ? and password = ?", email, password);
};
