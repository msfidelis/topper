'use strict';

const { Server, Book } = require('./');
const server1 = new Server('localhost', 4000);

// const task = async (data, server) => {
//     await server.write(`Server 1: message: ${data}`);
// };

// server1.task(task);

const book = new Book('0.0.0.0', 6000);


const tasks = [
    {
        name: 'Ping',
        task: async (data, server) => {
            console.log(data);
            await server.write('Pong');
        }
    }, 
    {
        name: 'Count',
        task: async (data, server) => {
            await server.write(`Count server`);
        }
    }
]

book.register(tasks);