'use strict';

const WebSocketServer = require('websocket').server;
const EventEmitter = require('events');

module.exports = class CurryBotServer extends EventEmitter{

	constructor (httpServer) {
		super();

		this.httpServer = httpServer;

		this.wsServer = new WebSocketServer({
			httpServer: this.httpServer,
			autoAcceptConnections: true
		});

		this.wsServer.on('connect', this.onConnect.bind(this));
	}

	onConnect(wsConnection) {
		console.log('CurryBot client connected');

		wsConnection.on('message', this.onMessage.bind(this));
	}

	onMessage(wsMessage) {
		switch(wsMessage.type) {
			case 'utf8':
				const message = JSON.parse(wsMessage.utf8Data);
				this.handleMessage(message);
				break;
			default:
				console.log('Unexpected WS message type received: ' + wsMessage.type);
				break;
		}
	}

	handleMessage(message) {
		switch(message.type) {
			case 'playRequest':
				this.emit('playRequest', message.sound);
				break;
			default:
				console.log('Unexpected message type received: ' + message.type);
				break;
		}
	}
}