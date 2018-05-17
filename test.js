'use strict';

const { Server } = require('./');
const server = new Server('0.0.0.0', 4000);

const task = async (data, server) => {
    server.write(`hello, my name is ${data.name} and Im ${data.age} old\n`);
}

server.task(task);

// const book = new Book('0.0.0.0', 6000);


// const tasks = [
//     {
//         name: 'Ping',
//         task: async (data, server) => {
//             console.log(data);
//             await server.write('Pong');
//         }
//     }, 
//     {
//         name: 'Count',
//         task: async (data, server) => {
//             await server.write(`Count server`);
//         }
//     }
// ]

// book.register(tasks);