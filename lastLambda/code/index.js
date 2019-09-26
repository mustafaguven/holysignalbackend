var base = require('./base.js');
var db = require('./db.js');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let result = {};
  let table = event.t;
  let id = event.id;
  try {
    let sql = "SELECT * FROM " + table + " WHERE Id = ?";
    result = await getUsers(sql, id);
    base.returnOK(result, callback);
  } catch (err) {
    base.returnError(err, callback);
  }
};

let getUsers = async (sql, params) => {
  return db.execSql(sql, params);
};
