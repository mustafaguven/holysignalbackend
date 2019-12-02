var base = require('./base.js');
var db = require('./db.js');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("getFavouriteCountByAyahNumber...");
  let result;
  try {
    let ayahNumber = event.ayahNumber
    let result = await getFavouriteCountByAyahNumber(ayahNumber);

    result = result[0]
    base.returnOK({ "total": result.total }, callback);

  } catch (err) {
    base.returnError(err.message, callback);
    console.log(err)
  }
};

let getFavouriteCountByAyahNumber = async (ayahNumber) => {
  return db.execSqlWithParams("SELECT count(1) as total FROM holysignaldb.AyahFavourites WHERE ayahNumber = ?", ayahNumber);
};
