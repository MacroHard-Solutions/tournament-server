const db = require('mysql2');

// const dbPool = db.createPool({
//   host: 'tourey-server-dev.c2ncyvtifq7i.us-east-1.rds.amazonaws.com',
//   port: 3306,
//   user: 'admin',
//   database: 'tourney_server',
//   password: '44gRmEvP9xLhR6d',
// });
const dbPool = db.createPool({
  host: 'localhost',
  port: 3307,
  user: 'admin',
  database: 'tourney_server',
  password: '44gRmEvP9xLhR6d',
});

module.exports = dbPool.promise();
