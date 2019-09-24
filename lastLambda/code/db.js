var mysql = require('mysql');
var config = require('./dbconfig.json');
var crypt = require('./crypt.js');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: config.dbhost,
  user: crypt.decrypt(config.dbuser),
  password: crypt.decrypt(config.dbpassword),
  database: crypt.decrypt(config.dbname)
});

var execSql = function(sql, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(sql, params, (err, results) => {
        connection.release();
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  });
}

module.exports = {
  execSql: execSql
}
