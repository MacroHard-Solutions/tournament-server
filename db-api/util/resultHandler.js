const keyMapping = require('./renameEntityKey');

exports.returnSuccess = (res, statusCode, message, rows) => {
  // if (rows !== null) keyMapping(rows);

  return res
    .status(statusCode)
    .json({ status: 'success', message: message, resultData: rows });
};
exports.returnError = (res, statusCode, err, msg) => {
  // console.log(err);

  return res.status(statusCode).json({
    status: 'failed',
    message: msg,
    logError: err,
  });
};
