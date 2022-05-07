# Tournament Server
This is our Software Design project which facilitates the creation and hosting of online game tournaments.

## Back-end Server Overview 
The following is a brief outline of the functions of the back-end server:
* Accept requests from the front-end app and process them
* Run tournaments and games and save the results to the database
* Communicate with player agents to facilitate games

## Requests

### Render Request
The render request is an http POST request, made by the front-end, where a game-log is given and the server renders the images of that game.
The body of the POST request should be a JSON object of the following format:
```JSON
{
	"data":{
		"type":"render",
		"game":"Tic-Tac-Toe",
		"moves":["0 0 X","1 2 O","2 2 X","1 1 O","1 0 X","2 1 O","2 0 X"]},
	"signal":{}
}
```
* The "type" field specifies the request type, in this case it is a render request.
* The "game" field specifies the name of the game which is being rendered (taken from the database).
* The "moves" field contains the game-log as a JSON array (also taken from the database).

The back-end server then sends an http response message with a 200 status code if the rendering was successful, and a JSON array containing the image URIs for the rendered images.

### GET Request
A rendered image can be downloaded using its URI in an http GET request. 
