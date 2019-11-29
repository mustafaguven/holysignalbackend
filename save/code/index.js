var base = require('./base.js');
var db = require('./db.js');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("signup...");
  let result;
  try {
    let name = event.body.name
    let surname = event.body.surname
    let email = event.body.email
    let password = base.encrypt(event.body.password)
    let sessionNo = event.body.sessionno
    let phoneBrand = event.headers.phonebrand
    let phoneModel = event.headers.phonemodel

    let result = await checkEmailAvailable(email);
    result = result[0]
    if((typeof result !== 'undefined') && result != null){
       base.returnError("Already stored email", callback, 105);
       return
    }

    await insertUser([name, surname, email, password, sessionNo, phoneBrand, phoneModel]);

    result = {
        "name": name,
        "surname": surname,
        "token": base.encrypt(email + "::" + password + "::" + sessionNo)
      }
    base.returnOK(result, callback);
  } catch (err) {
    base.returnError(err.message, callback);
    console.log(err)
  }
};

let checkEmailAvailable = async (email) => {
  return db.execSqlWithParams("SELECT * FROM holysignaldb.Member WHERE email = ?", email);
};

let insertUser = async (name, surname, email, password, sessionNo, phoneBrand, phoneModel) => {
  return db.execSqlWithParams("INSERT INTO holysignaldb.Member (name, surname, email, password, sessionNo, phoneBrand, phoneModel, sessionChangeCount) VALUES (?, ?, ?, ?, ?, ?, ?, 0)", name, surname, email, password, sessionNo, phoneBrand, phoneModel);
};
