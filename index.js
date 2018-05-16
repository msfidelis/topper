'use strict';

const Server = require('./server');
const server = new Server('localhost', 4000);

const task = (data, server) => {
    console.log('to aqui');
    server.write(`${data}`);
};

server.task(task);