'use strict';

const net   = require('net');

const onConnect = socket => {
    console.log(`New client: ${socket.remoteAddress}:${socket.remotePort}`);
};

class Server {

    constructor(host = '127.0.0.1', port = '6960') {
        this.host = host;
        this.port = port;
    };

    task(callback) {
        const server = this;
        server.connection = net.createServer(socket => {

            socket.on('data', data => {
                console.log(data);
            });

            this.connection.listen(this.port, this.host);
        });
    }
}

module.exports = Server;