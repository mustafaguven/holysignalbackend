var mysql = require('mysql');
var config = require('./dbconfig.json');
var baseResponse = require('./baseResponse.js');

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
    let sql = "SELECT * FROM " + event.table;
    result = await getUsers(sql, 0);
    baseResponse.setResponse(result, null, callback)
  } catch (err) {
    baseResponse.setResponse(null, err, callback)
  }
};


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
