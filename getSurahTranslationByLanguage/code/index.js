var base = require('./base.js');
var db = require('./db.js');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("surahtranslate is getting");
  try {
    let editionId = event.editionId;
    //let editionId = 60
    let surahTranslationData = await getSurahTranslationByLanguage(editionId);
    let languageId = surahTranslationData[0].languageId
    surahTranslationData = surahTranslationData.map(u => ({Id: u.Id, surahNumber: u.surahNumber, name: u.name}));

    let result = {
      'languageId' : languageId,
      'translationData' : surahTranslationData
    }
    //console.log(JSON.stringify(result))
    base.returnOK(result, callback);
  } catch (err) {
    base.returnError(result, callback);
    //console.log(err)
  }
};

let getSurahTranslationByLanguage = async (editionId) => {
  return db.execSqlWithParams("SELECT T.* FROM holysignaldb.Language L Inner Join Edition E on L.abbreviation = E.language Inner Join SurahTranslate T on L.Id = T.languageId and E.Id = ? order by Id, surahNumber", editionId);
};
