'use strict';

const { Server } = require('./');
const server1 = new Server('localhost', 4000);

const task = async (data, server) => {
    await server.write(`Server 1: message: ${data}`);
};

server1.task(task);
