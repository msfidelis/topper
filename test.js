'use strict';

const { Server } = require('./');
const server = new Server('0.0.0.0', 4000);


const tasks = [
    {
        name: 'Ping',
        task: async (data, server) => await server.write('Pong\n')
    }, 
    {
        // echo 'Sum {"numbers": [1, 2, 3, 4, 5]}' | nc localhost 4000
        name: 'Sum',
        task: async (data, server) => {
            let sum = data.numbers.reduce((prev, curr) => prev + curr);
            await server.write(`The sum is: ${sum} \n`);
        }
    },
    {   
        // echo 'Avg {"numbers": [1, 2, 3, 4, 5]}' | nc localhost 4000
        name: 'Avg',
        task: async (data, server) => {
            let sum = data.numbers.reduce((prev, curr) => prev + curr);
            let average =  sum / data.numbers.length;
            server.write(`The sum of numbers is: ${sum} \n`);
            server.write(`The average is: ${average} \n`);
        }
    }
]

server.multiTask(tasks);