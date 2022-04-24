exports.welcome = (req, res) => {
  res.body = '<h1>Welcome!</h1>';
  res.status(200).end('<h1>Welcome</h1>');
};
