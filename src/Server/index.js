'use strict';

const net   = require('net');
const json  = require('../Parsers/json');

class Server {

    constructor(host = '127.0.0.1', port = 6960) {
        this.host = host;
        this.port = port;
    };

    task(task) {
        net.createServer(socket => {
            socket.on('data', async data => {
                let message = await json(data);
                task(message, socket);
            });
        }).listen(this.port, this.host);
    };
}

module.exports = Server;
