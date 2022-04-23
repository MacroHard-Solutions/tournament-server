const express = require('express'); // Framework for node
const morgan = require('morgan'); // HTTP request logger

const slugify = require('slugify'); // NOTE: This is random...

const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const gameRouter = require('./routes/gameRouter');

const app = express();
////////////////////////////////
/// Middleware
////////////////////////////////
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); // Debug logging
}

app.use(express.json()); // Parse the body into json
app.use(express.static(`${__dirname}/public`)); // Provide the /public directory for file transfer

// Log the time the file was requested
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

////////////////////////////////
/// Routes
////////////////////////////////

app.use('/', homeRouter);
app.use('/api/v2/', homeRouter);

app.use('/api/v2/user', userRouter);
app.use('/api/v2/game', gameRouter);

module.exports = app;
