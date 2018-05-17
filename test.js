'use strict';

const { Server } = require('./');
const server = new Server('localhost', 4000);

const task = async (data, server) => {
    console.log(`New message!`);
    await server.write(`Server Payload: message: ${data}`);
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