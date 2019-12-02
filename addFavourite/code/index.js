var base = require('./base.js');
var db = require('./db.js');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("addFavourite...");
  let result;
  try {

    let token = event.body.token
    let ayahNumber = event.body.ayahNumber
    let isAdd = event.body.isAdd // 1=add 0=remove
    let decryptedToken = base.decrypt(token).split("::")
    let email = decryptedToken[0]

    let result = await getMember(email);
    result = result[0]

    if((typeof result !== 'undefined') && result != null){
      await deleteFavourite([result.Id, ayahNumber])
      var result2 = { "status": "removed" }
      if(isAdd) {
        await insertFavourite([result.Id, ayahNumber]);
        result2 = { "status": "inserted" }
      }
      base.returnOK(result2, callback);
    } else {
      base.returnError("mistaken token")
    }
  } catch (err) {
    base.returnError(err.message, callback);
    console.log(err)
  }
};

let getMember = async (email) => {
  return db.execSqlWithParams("SELECT Id FROM holysignaldb.Member WHERE email = ?", email);
};

let deleteFavourite = async (memberId, ayahNumber) => {
  return db.execSqlWithParams("DELETE FROM holysignaldb.AyahFavourites WHERE memberId = ? AND ayahNumber = ?", memberId, ayahNumber);
};

let insertFavourite = async (memberId, ayahNumber) => {
  return db.execSqlWithParams("INSERT INTO holysignaldb.AyahFavourites (memberId, ayahNumber) VALUES (?, ?)", memberId, ayahNumber);
};
