var base = require('./base.js');
var db = require('./db.js');
const rp = require("request-promise-native");
const url = "http://api.alquran.cloud/v1/quran/"

exports.handler = async (event, context, callback) => {
  console.log("book getting is started...");
  let editions = await getEditions("translation");
  let startedEditionId = editions[0].Id;
  console.log("startedEditionId = " + startedEditionId);
  for (const edition of editions) {
    continue;
    console.log(edition.identifier + " is getting...(" + edition.Id + ")")
    let book = await getBook(edition.identifier);
    for (const surah of book.data.surahs) {
      if (startedEditionId === edition.Id) {
        let surahSql = "INSERT INTO Surah (number, name, englishName, englishNameTranslation, revelationType) VALUES (?, ?, ?, ?, ?)"
        insert(surahSql, [surah.number, surah.name, surah.englishName, surah.englishNameTranslation, surah.revelationType]);
      }

      for (const ayah of surah.ayahs) {
        let ayahSql = "INSERT INTO Ayah (editionId, surahNumber, number, text, numberInSurah, juz) VALUES (?, ?, ?, ?, ?, ?);"
        insert(ayahSql, [edition.Id, surah.number, ayah.number, ayah.text, ayah.numberInSurah, ayah.juz]);
      }
    }
    console.log(edition.identifier + " is finished...")
  }
  console.log("retrieving process is finished...");
};


let getBook = async (identifier) => {
  try {
    var options = {
      url: url + identifier,
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

let getEditions = async (type) => {
  return db.execSqlWithParams("SELECT * FROM holysignaldb.Edition WHERE type = ?", type);
};

let truncateTable = async () => {
  return db.execSql("truncate table Surah");
};

let insert = async (sql, params) => {
  return db.execSqlWithParams(sql, params);
};
