# currybot-api
API for messaging between the currybot server and client.

# Usage
## Client
Simply instantiate the client and give it an address to connect to.
```
const CurryBotClient = require('currybot-api').CurryBotClient;
const curryClient = new CurryBotClient('ws://localhost:8080', () => {
	console.log('CurryClient connected!');

	curryClient.sendPlayRequest('blup');
});

curryClient.connect();
```

## Server
Create an HTTP server and pass it into the server. You can then listen on events from the API
```
const http = require('http');
const CurryBotServer = require('./index').CurryBotServer;

const httpServer = http.createServer((request, response) => {
	response.writeHead(404);
	response.end();
});
httpServer.listen(8080, () => {
	console.log('Server listening');
});

const curryServer = new CurryBotServer(httpServer);

curryServer.on('playRequest', (sound) => {
	console.log('Playing ' + sound + '!');
});
```