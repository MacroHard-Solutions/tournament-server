exports.logError = (res, err, msg) => {
  (err) => {
    console.log(err);

    res.status(502).json({
      status: 'Failed',
      message: msg,
      logError: err,
    });
  };
};
