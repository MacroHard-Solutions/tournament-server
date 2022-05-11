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
  ['AGENT_STATUS', 'agentStatus'],

  ['MATCH_LOG_ID', 'matchLogID'],
  ['MATCH_LOG_DATA', 'matchLogData'],
  ['MATCH_LOG_TIME', 'timeStamp'],

  ['ADDRESS_ID', 'addressID'],
  ['ADDRESS_IP', 'ipAddress'],
  ['ADDRESS_PORT', 'portNum'],
]);

module.exports = async (resultSet) => {
  console.log(resultSet);

  resultSet.forEach((rowObject) => {
    let clientKey;

    for (let dbKey in rowObject) {
      clientKey = keyMapping.get(dbKey);
      rowObject[clientKey] = rowObject[dbKey];
      delete rowObject[dbKey];
    }
  });
};
