const keyMapping = new Map([
  ['USER_ID', 'userID'],
  ['USER_FNAME', 'fName'],
  ['USER_LNAME', 'lName'],
  ['USERNAME', 'uName'],
  ['USER_EMAIL', 'uEmail'],
  ['USER_PASSWD', 'uPass'],
  ['USER_IS_ADMIN', 'isAdmin'],
  ['USER_NOTIFICATIONS', 'wantsNotifications'],
  ['USER_DP', 'userDP'],

  ['GAME_ID', 'gameID'],
  ['GAME_NAME', 'gameName'],
  ['FILE_NAME', 'gameFileName'],
  ['GAME_ICON', 'gameIcon'],

  ['TOURNAMENT_ID', 'tournamentID'],
  ['TOURNAMENT_NAME', 'tournamentName'],

  ['AGENT_ID', 'agentID'],
  ['AGENT_ELO', 'agentELO'],

  ['MATCH_LOG_ID', 'matchLogID'],
  ['MATCH_LOG_TIME', 'timeStamp'],

  ['ADDRESS_ID', 'addressID'],
  ['ADDRESS_IP', 'ipAddress'],
  ['ADDRESS_PORT', 'portNum'],
]);

exports.renameMultipleRows = async (rows) => {};

modules.exports = async (rows) => {
  resultSet = rows[0];
  console.log(rows);

  for (let row in rows) {
    console.log(row);
    console.log(row === 'USER_ID');

    for (let key in row) {
      console.log(key);
    }
  }
  if (old_key !== new_key) {
    Object.defineProperty(
      o,
      new_key,
      Object.getOwnPropertyDescriptor(o, old_key)
    );
    delete o[old_key];
  }
};
