---
title: DB API v2.12.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="db-api">DB API v2.12.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="https://tournament-server.herokuapp.com/api/v2/">https://tournament-server.herokuapp.com/api/v2/</a>

<h1 id="db-api-miscellaneous">Miscellaneous</h1>

## get-https:--tournament-server.herokuapp.com

<a id="opIdget-https:--tournament-server.herokuapp.com"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://tournament-server.herokuapp.com/api/v2/

```

```http
GET https://tournament-server.herokuapp.com/api/v2/ HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://tournament-server.herokuapp.com/api/v2/',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://tournament-server.herokuapp.com/api/v2/')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://tournament-server.herokuapp.com/api/v2/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://tournament-server.herokuapp.com/api/v2/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /`

*The API documentation*

<h3 id="get-https:--tournament-server.herokuapp.com-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieves the API documentation|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="db-api-agent">Agent</h1>

## put-https:--tournament-server.herokuapp.com-api-v2-agent

<a id="opIdput-https:--tournament-server.herokuapp.com-api-v2-agent"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT https://tournament-server.herokuapp.com/api/v2/agent \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PUT https://tournament-server.herokuapp.com/api/v2/agent HTTP/1.1
Host: tournament-server.herokuapp.com
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "data": {
    "userID": "0fbe7dd3-20b4-400a-ad28-53d86dd36cd2",
    "tournamentID": "e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505",
    "ipAddress": "192.168.0.0.1",
    "portNum": 8000
  },
  "signal": {}
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('https://tournament-server.herokuapp.com/api/v2/agent',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.put 'https://tournament-server.herokuapp.com/api/v2/agent',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('https://tournament-server.herokuapp.com/api/v2/agent', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://tournament-server.herokuapp.com/api/v2/agent', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/agent");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "https://tournament-server.herokuapp.com/api/v2/agent", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /agent`

*Inserts the user's agent*

Inserts the agent into the database

> Body parameter

```json
{
  "data": {
    "userID": "0fbe7dd3-20b4-400a-ad28-53d86dd36cd2",
    "tournamentID": "e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505",
    "ipAddress": "192.168.0.0.1",
    "portNum": 8000
  },
  "signal": {}
}
```

<h3 id="put-https:--tournament-server.herokuapp.com-api-v2-agent-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» data|body|object|false|none|
|»» userID|body|string|false|none|
|»» tournamentID|body|string|false|none|
|»» ipAddress|body|string|false|none|
|»» portNum|body|integer|false|none|
|» signal|body|object|false|none|

> Example responses

> 201 Response

```json
{
  "status": "success",
  "message": "The user's agent has been inserted successfully",
  "resultData": {
    "AGENT_ID": "37729ba7-b6ec-4d41-aa04-e8d9a4bc19e6",
    "ADDRESS_IP": "string",
    "ADDRESS_PORT": 5838,
    "TOURNAMENT_ID": "01934c61-c6f6-11ec-a02e-0ab3cd6d5505",
    "AGENT_ELO": 1500
  }
}
```

<h3 id="put-https:--tournament-server.herokuapp.com-api-v2-agent-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Success|Inline|

<h3 id="put-https:--tournament-server.herokuapp.com-api-v2-agent-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» message|string|false|none|none|
|» resultData|object|false|none|none|
|»» AGENT_ID|string|false|none|none|
|»» ADDRESS_IP|string|false|none|none|
|»» ADDRESS_PORT|integer|false|none|none|
|»» TOURNAMENT_ID|string|false|none|none|
|»» AGENT_ELO|float|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## delete__agent

> Code samples

```shell
# You can also use wget
curl -X DELETE https://tournament-server.herokuapp.com/api/v2/agent

```

```http
DELETE https://tournament-server.herokuapp.com/api/v2/agent HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/agent',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete 'https://tournament-server.herokuapp.com/api/v2/agent',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('https://tournament-server.herokuapp.com/api/v2/agent')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','https://tournament-server.herokuapp.com/api/v2/agent', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/agent");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "https://tournament-server.herokuapp.com/api/v2/agent", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /agent`

*Delete api agents*

<h3 id="delete__agent-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Item deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

## post-https:--tournament-server.herokuapp.com-api-v2-agent

<a id="opIdpost-https:--tournament-server.herokuapp.com-api-v2-agent"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://tournament-server.herokuapp.com/api/v2/agent

```

```http
POST https://tournament-server.herokuapp.com/api/v2/agent HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/agent',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://tournament-server.herokuapp.com/api/v2/agent',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://tournament-server.herokuapp.com/api/v2/agent')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://tournament-server.herokuapp.com/api/v2/agent', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/agent");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://tournament-server.herokuapp.com/api/v2/agent", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /agent`

*Create api agent*

<h3 id="post-https:--tournament-server.herokuapp.com-api-v2-agent-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Item created|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="db-api-game">Game</h1>

## get-https:--tournament-server.herokuapp.com-api-v2-game

<a id="opIdget-https:--tournament-server.herokuapp.com-api-v2-game"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://tournament-server.herokuapp.com/api/v2/game

```

```http
GET https://tournament-server.herokuapp.com/api/v2/game HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/game',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://tournament-server.herokuapp.com/api/v2/game',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://tournament-server.herokuapp.com/api/v2/game')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://tournament-server.herokuapp.com/api/v2/game', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/game");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://tournament-server.herokuapp.com/api/v2/game", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /game`

*List tournament-server.herokuapp.com v2s*

<h3 id="get-https:--tournament-server.herokuapp.com-api-v2-game-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|None|

<aside class="success">
This operation does not require authentication
</aside>

## put-https:--tournament-server.herokuapp.com-api-v2-game

<a id="opIdput-https:--tournament-server.herokuapp.com-api-v2-game"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT https://tournament-server.herokuapp.com/api/v2/game

```

```http
PUT https://tournament-server.herokuapp.com/api/v2/game HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/game',
{
  method: 'PUT'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.put 'https://tournament-server.herokuapp.com/api/v2/game',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.put('https://tournament-server.herokuapp.com/api/v2/game')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://tournament-server.herokuapp.com/api/v2/game', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/game");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "https://tournament-server.herokuapp.com/api/v2/game", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /game`

*Update api games*

<h3 id="put-https:--tournament-server.herokuapp.com-api-v2-game-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Item created|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="db-api-match">Match</h1>

## post-https:--tournament-server.herokuapp.com-api-v2-match

<a id="opIdpost-https:--tournament-server.herokuapp.com-api-v2-match"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://tournament-server.herokuapp.com/api/v2/match

```

```http
POST https://tournament-server.herokuapp.com/api/v2/match HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/match',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://tournament-server.herokuapp.com/api/v2/match',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://tournament-server.herokuapp.com/api/v2/match')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://tournament-server.herokuapp.com/api/v2/match', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/match");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://tournament-server.herokuapp.com/api/v2/match", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /match`

*Create api match*

<h3 id="post-https:--tournament-server.herokuapp.com-api-v2-match-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Item created|None|

<aside class="success">
This operation does not require authentication
</aside>

## put-https:--tournament-server.herokuapp.com-api-v2-match

<a id="opIdput-https:--tournament-server.herokuapp.com-api-v2-match"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT https://tournament-server.herokuapp.com/api/v2/match

```

```http
PUT https://tournament-server.herokuapp.com/api/v2/match HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/match',
{
  method: 'PUT'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.put 'https://tournament-server.herokuapp.com/api/v2/match',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.put('https://tournament-server.herokuapp.com/api/v2/match')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://tournament-server.herokuapp.com/api/v2/match', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/match");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "https://tournament-server.herokuapp.com/api/v2/match", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /match`

*Update api matches*

<h3 id="put-https:--tournament-server.herokuapp.com-api-v2-match-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Item created|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="db-api-tournament">Tournament</h1>

## get-https:--tournament-server.herokuapp.com-api-v2-tournament

<a id="opIdget-https:--tournament-server.herokuapp.com-api-v2-tournament"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://tournament-server.herokuapp.com/api/v2/tournament

```

```http
GET https://tournament-server.herokuapp.com/api/v2/tournament HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/tournament',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://tournament-server.herokuapp.com/api/v2/tournament',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://tournament-server.herokuapp.com/api/v2/tournament')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://tournament-server.herokuapp.com/api/v2/tournament', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/tournament");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://tournament-server.herokuapp.com/api/v2/tournament", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /tournament`

*List tournament-server.herokuapp.com v2s*

<h3 id="get-https:--tournament-server.herokuapp.com-api-v2-tournament-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Item created|None|

<aside class="success">
This operation does not require authentication
</aside>

## post-https:--tournament-server.herokuapp.com-api-v2-tournament-add

<a id="opIdpost-https:--tournament-server.herokuapp.com-api-v2-tournament-add"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://tournament-server.herokuapp.com/api/v2/tournament/add

```

```http
POST https://tournament-server.herokuapp.com/api/v2/tournament/add HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/tournament/add',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://tournament-server.herokuapp.com/api/v2/tournament/add',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://tournament-server.herokuapp.com/api/v2/tournament/add')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://tournament-server.herokuapp.com/api/v2/tournament/add', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/tournament/add");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://tournament-server.herokuapp.com/api/v2/tournament/add", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /tournament/add`

*Create api tournament*

<h3 id="post-https:--tournament-server.herokuapp.com-api-v2-tournament-add-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Item created|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="db-api-user">User</h1>

## get-https:--tournament-server.herokuapp.com-api-v2-user

<a id="opIdget-https:--tournament-server.herokuapp.com-api-v2-user"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://tournament-server.herokuapp.com/api/v2/user

```

```http
GET https://tournament-server.herokuapp.com/api/v2/user HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/user',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://tournament-server.herokuapp.com/api/v2/user',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://tournament-server.herokuapp.com/api/v2/user')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://tournament-server.herokuapp.com/api/v2/user', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/user");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://tournament-server.herokuapp.com/api/v2/user", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /user`

*List tournament-server.herokuapp.com v2s*

<h3 id="get-https:--tournament-server.herokuapp.com-api-v2-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|None|

<aside class="success">
This operation does not require authentication
</aside>

## post-https:--tournament-server.herokuapp.com-api-v2-user

<a id="opIdpost-https:--tournament-server.herokuapp.com-api-v2-user"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://tournament-server.herokuapp.com/api/v2/user

```

```http
POST https://tournament-server.herokuapp.com/api/v2/user HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/user',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://tournament-server.herokuapp.com/api/v2/user',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://tournament-server.herokuapp.com/api/v2/user')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://tournament-server.herokuapp.com/api/v2/user', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/user");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://tournament-server.herokuapp.com/api/v2/user", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /user`

*Create tournament-server.herokuapp.com v2*

<h3 id="post-https:--tournament-server.herokuapp.com-api-v2-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Item created|None|

<aside class="success">
This operation does not require authentication
</aside>

## put-https:--tournament-server.herokuapp.com-api-v2-user

<a id="opIdput-https:--tournament-server.herokuapp.com-api-v2-user"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT https://tournament-server.herokuapp.com/api/v2/user

```

```http
PUT https://tournament-server.herokuapp.com/api/v2/user HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/user',
{
  method: 'PUT'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.put 'https://tournament-server.herokuapp.com/api/v2/user',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.put('https://tournament-server.herokuapp.com/api/v2/user')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://tournament-server.herokuapp.com/api/v2/user', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/user");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "https://tournament-server.herokuapp.com/api/v2/user", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /user`

*Update tournament-server.herokuapp.com v2s*

<h3 id="put-https:--tournament-server.herokuapp.com-api-v2-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Item created|None|

<aside class="success">
This operation does not require authentication
</aside>

## post-https:--tournament-server.herokuapp.com-api-v2-user-signupCheck

<a id="opIdpost-https:--tournament-server.herokuapp.com-api-v2-user-signupCheck"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://tournament-server.herokuapp.com/api/v2/user/signupCheck

```

```http
POST https://tournament-server.herokuapp.com/api/v2/user/signupCheck HTTP/1.1
Host: tournament-server.herokuapp.com

```

```javascript

fetch('https://tournament-server.herokuapp.com/api/v2/user/signupCheck',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://tournament-server.herokuapp.com/api/v2/user/signupCheck',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://tournament-server.herokuapp.com/api/v2/user/signupCheck')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://tournament-server.herokuapp.com/api/v2/user/signupCheck', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://tournament-server.herokuapp.com/api/v2/user/signupCheck");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://tournament-server.herokuapp.com/api/v2/user/signupCheck", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /user/signupCheck`

*Create api user*

<h3 id="post-https:--tournament-server.herokuapp.com-api-v2-user-signupcheck-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|

<aside class="success">
This operation does not require authentication
</aside>

