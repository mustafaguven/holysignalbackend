module.exports = {

    setResponse: function (result, err, callback) {
      return callback(null, {
        message: JSON.stringify(err),
        data: JSON.stringify(result),
        status: err === null ? 1 : 0
      });
    }

};
