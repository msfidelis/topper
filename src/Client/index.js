'use strict';

const net       = require('net');
const string    = require('../Parsers/string');
const json      = require('../Parsers/json')

/**
 * Topper Client Class
 */
class Client {

    /**
     * Simple Constructor
     */
    constructor() {
        this.servers = []
    }

    /**
     * Add servers to client lists
     * @param {*} host 
     * @param {*} port 
     */
    addServer(host, port) {
        this.servers.push({host: host, port: port});
    }

    /**
     * Send message to servers with simple sockets
     * @param {*} task 
     * @param {*} message 
     */
    send(task, message) {
        const responses = this.servers.map(server => {
            return new Promise((resolve, reject) => {
                const client = new net.Socket();
                client.connect(server.port, server.host, async () => {
                    const data = await string(message);
                    const transport = `${task} ${data}`;
                    client.write(transport);
                });
                client.on('data', data => {
                    resolve(json(data.toString()));
                    client.destroy();
                });
                client.on('error', err => {
                    reject(err);
                    client.destroy();
                });
            });
        });
        return Promise.all(responses);
    }
}

module.exports = Client;