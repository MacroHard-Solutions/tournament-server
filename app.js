const express = require('express'); // Framework for node
const morgan = require('morgan'); // HTTP request logger
const slugify = require('slugify'); //

const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const gameRouter = require('./routes/gameRouters');

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

////////////////////////////////
/// Routes
////////////////////////////////

app.use('/', homeRouter);

app.use('/api/v2/user', userRouter);
app.use('/api/v2/game', gameRouter);

module.exports = app;
