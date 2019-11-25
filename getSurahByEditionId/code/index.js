var base = require('./base.js');
var db = require('./db.js');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("surah is getting");
  try {
    let surahNumber = event.surahNumber;
    let editionId = event.editionId;
    let ayahs = await getSurahByEditionId([surahNumber, editionId]);
    let surahData = {
      'surahNumber': surahNumber,
      'editionId': editionId,
      'ayahs': ayahs
    }
    //console.log(JSON.stringify(result))
    base.returnOK(surahData, callback);
  } catch (err) {
    base.returnError(surahData, callback);
  }
};

let getSurahByEditionId = async (surahNumber, editionId) => {
  return db.execSqlWithParams("SELECT Id, number, text, numberInSurah, juz FROM holysignaldb.Ayah WHERE surahNumber = ? and editionId = ?", surahNumber, editionId);
};
