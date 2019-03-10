'use strict';

const WebSocketClient = require('websocket').client;

module.exports = class CurryBotClient {

	constructor(address, onConnect) {
		this.wsClient = new WebSocketClient();
		this.address = address;
		this.wsConnection;

		this.wsClient.on('connect', (wsConnection) => {
			this.wsConnection = wsConnection;

			onConnect();
		});

		this.wsClient.on('connectFailed', (error) => {
			console.log('Couldn\'t connect: ' + error.toString());
		});
	}

	connect() {
		this.wsClient.connect(this.address);
	}

	sendPlayRequest(sound) {
		this.sendMessage({
			'type': 'playRequest',
			'sound': sound
		});
	}

	sendMessage(message) {
		this.wsConnection.sendUTF(JSON.stringify(message));
	}

}