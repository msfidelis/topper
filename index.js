'use strict';

const Server = require('./server');
const server1 = new Server('localhost', 4000);
const server2 = new Server('localhost', 5000);

const task = async (data, server) => {
    await server.write(`Server 1: message: ${data}`);
};

const task2 = async (data, server) => {
    await server.write(`Server 2: message: ${data}`);
};

server1.task(task);
server2.task(task2);