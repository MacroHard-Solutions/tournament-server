module.exports = (res, err, msg) => {
  console.log(err);

    res.status(502).json({
      status: 'Failed',
      message: msg,
      logError: err,
    });
}