# Tournament Server
This is our Software Design project which facilitates the creation and hosting of online game tournaments.

## Back-end Server Overview 
The following is a brief outline of the functions of the back-end server:
* Accept requests from the front-end app and process them
* Run tournaments and games and save the results to the database
* Communicate with agents to facilitate games


## CircleCI Badge
[![CircleCI](https://circleci.com/gh/MacroHard-Solutions/tournament-server.svg?style=svg&circle-token=689cedba0802f91837c71ca9770d92f0f10b15bf)](https://app.circleci.com/pipelines/github/MacroHard-Solutions/tournament-server)

## Code-Cov Badge
[![codecov](https://codecov.io/gh/MacroHard-Solutions/tournament-server/branch/backend-server/graph/badge.svg?token=X67KO80SL5)](https://codecov.io/gh/MacroHard-Solutions/tournament-server)


# Requests

## 1. Render Request
### 1.1. Description
The render request is an http POST request, made by the front-end, where a game-log is given and the server renders the images of that game.
The body of the POST request should be a JSON object of the following format:
```JSON
{
	"data": {
		"type": "render",
		"game": "Tic-Tac-Toe",
		"moves": ["0 0 X","1 2 O","2 2 X","1 1 O","1 0 X","2 1 O","2 0 X"]
		},
	"signal": {}
}
```
* The "type" field specifies the request type, in this case it is a render request.
* The "game" field specifies the name of the game which is being rendered (taken from the database).
* The "moves" field contains the game-log as a JSON array (also taken from the database).

### 1.2. Responses
* Status Code 200: <br>
  The rendering was successful. The response body is a JSON object containing a JSON array containing the image URIs for the rendered images. 
  ```JSON
  {
  	"imageURIs": ["images/game1/0.jpg", "images/game1/1.jpg", "images/game1/2.jpg", "images/game1/3.jpg"]
  }
  ```
* Status Code 400: <br>
  The rendering was unsuccesful. The response body is one of the following error messages: <br>
  "Unable to process render request" <br>
  "Game name is not recognised. Unable to process render request" 

## 2. Match Request
### 2.1. Description
The match request is an http POST request, made by the front-end, where user agent IDs are given and a match is started between those agents. 
The body of the POST request should be a JSON object of the following format:
```JSON
{
	"data": {
		"type": "match",
    		"game":"Tic-Tac-Toe",
    		"tournamentID": "22531f29-cd83-11ec-8a34-0ea680fee648",
    		"agentIDs": ["a0ea49b7-ce11-11ec-8a34-0ea680fee648", "e8955372-ce0e-11ec-8a34-0ea680fee648"]
		},
  	"signal": {}
}
```
* The "type" field specifies the request type, in this case it is a match request.
* The "game" field specifies the name of the game which is being played (taken from the database).
* The "tournamentID" field specifies which tournament this match is being played under.
* The "agentsID" contains the IDs of the agents as a JSON array

### 2.2. Responses
* Status Code 200: <br>
  The match has begun. The response body is the Match Log ID which the front-end will use to make poll requests. 
* Status Code 400: <br>
  The match was not started because an error occurred. The response body is one of the following error messages: <br>
  "Unable to start match" <br>
  "Unable to set up match between agents" <br>
  "Server could not reach agent. Unable to start match"
  
## 3. Poll Request
### 3.1. Description
The poll request is an http POST request, made by the front-end, where a match log ID is given and the server returns the imageURIs of the match states that have passed.
The body of the POST request should be a JSON object of the following format:
```JSON
{
	"data": {
		"type": "poll",
		"matchLogID": "455befa3-d94d-11ec-8a34-0ea680fee648"
		},
	"signal": {}
}
```
* The "type" field specifies the request type, in this case it is a poll request.
* The "matchLogID" field specifies the match log ID of the live match.

### 3.2. Responses
* Status Code 200: <br>
  The poll was successful. The response body is a JSON object containing the number of states (images) which have occurred and a JSON array containing the image URIs for the rendered images. 
  ```JSON
  {
  	"numberOfStates": 3
  	"imageURIs": ["liveMatches/game1/0.jpg", "liveMatches/game1/1.jpg", "liveMatches/game1/2.jpg"]
  }
  ```
* Status Code 400: <br>
  The poll was unsuccesful. The response body is one of the following error messages: <br>
  "Match Log ID is not recognised. Unable to process Poll request" <br>
  "Agent data could not be retrieved. Either the agent does not exist or the database server is down"

## 4. GET Request
A rendered or live image can be downloaded using its URI in an http GET request. 
