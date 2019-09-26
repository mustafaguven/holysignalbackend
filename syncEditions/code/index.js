var base = require('./base.js');
var db = require('./db.js');
const rp = require("request-promise-native");
const url = "http://api.alquran.cloud/v1/edition"

exports.handler = async (event, context, callback) => {
  //context.callbackWaitsForEmptyEventLoop = false;

  console.log("Since all data are retrieved below lines are commented intentionally. Uncomment below lines to retrieve all data from scratch. ")

  /*await truncateTable();
  console.log("Edition table is truncated")

  let editions = await getEditions();
  editions.data.forEach(function(edition) {
    let sql = `INSERT INTO Edition (identifier, language, name, englishName, format, type)
     VALUES(
      '` + edition.identifier + `',
     '` + base.quoteCorrector(edition.language) + `',
     '` + base.quoteCorrector(edition.name) + `',
     '` + base.quoteCorrector(edition.englishName) + `',
    '` + base.quoteCorrector(edition.format) + `',
    '` + base.quoteCorrector(edition.type) + `');`
    insert(sql);
  });
  console.log("all editions are inserted successfully")
  */

};

let getEditions = async () => {
  try {
    var options = {
      url: url,
      method: 'GET',
      json: true,
      headers: {
        'content-type': 'application/json'
      }
    };
    return await rp(options);

  } catch (error) {
    console.log("Error: ", error);
  }
}

let truncateTable = async () => {
  return db.execSql("truncate table Edition");
};

let insert = async (sql, params) => {
  return db.execSql(sql, params);
};
