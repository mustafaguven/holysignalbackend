var mysql = require('mysql');
var config = require('./dbconfig.json');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: config.dbhost,
  user: config.dbuser,
  password: config.dbpassword,
  database: config.dbname
});

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let result = {};
  try {
    let table = event.table
    let sql = "SELECT * FROM " + table;
    result = await getUsers(sql, 0);
    response(result, null, callback)
  } catch (err) {
    response(null, err, callback)
  }
};

function response(result, err, callback) {
  return callback(null, {
    message: JSON.stringify(err),
    data: JSON.stringify(result),
    status: err === null ? 1 : 0
  });
}

let getUsers = async (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(sql, params, (err, results) => {
        if (err) {
          reject(err);
        }
        connection.release();
        resolve(results);
      });
    });
  });
};
