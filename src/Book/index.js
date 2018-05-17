'use strict';

const net = require('net');
const json = require('../Parsers/json');
class Book {

    constructor(host = '0.0.0.0', port = 6000) {
        this.host = host;
        this.port = port;
        this.actions = {};
        console.log(`Book Service is running on: ${host}:${port}`);
    }

    async register(jobs) {
   
        await jobs.forEach(job => {
            this.actions[job.name] = job.task;
        });

        console.log(this.actions);
        
        net.createServer(socket => {
            socket.on('data', async data => {
                const message   = await data.toString('utf8');
                const action    = await message.replace(/ .*/,'');
                const payload   = await json(message.substr(message.indexOf(" ") + 1));
                console.log(this.actions[action], console.log(action));
            });
        }).listen(this.port, this.host);
    };

}

module.exports = Book;
