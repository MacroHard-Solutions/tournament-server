const express = require('express'); // Framework for node
const morgan = require('morgan'); // HTTP request logger
const cors = require('cors'); // CORS middleware

const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const agentRouter = require('./routes/agentRouter');
const gameRouter = require('./routes/gameRouter');
const tournamentRouter = require('./routes/tournamentRouter');
const matchRouter = require('./routes/matchRouter');

const app = express();
////////////////////////////////
/// Middleware
////////////////////////////////
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); // Debug logging
}

app.use(cors());

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

try {
  app.use('/', homeRouter);
  app.use('/api/v2/', homeRouter);

  app.use('/api/v2/user', userRouter);
  app.use('/api/v2/agent', agentRouter);
  app.use('/api/v2/game', gameRouter);
  app.use('/api/v2/tournament', tournamentRouter);
  app.use('/api/v2/match', matchRouter);
} catch (err) {
  app.use((req, res, next) => {
    res.status(400).json({
      status: 'error',
      message:
        'Invalid request body data. Please check the documentation to correct the request.',
      errorLog: err,
    });

    next();
  });
}

module.exports = app;
