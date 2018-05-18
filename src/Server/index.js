'use strict';

const net   = require('net');
const json  = require('../Parsers/json');

/**
 * 
 */
class Server {

    /**
     * Server Constructor
     * @param {*} host address 
     * @param {*} port 
     */
    constructor(host = '127.0.0.1', port = 6960) {
        this.host = host;
        this.port = port;
        this.actions = [];
        console.log(`New task registered on tcp://${host}:${port}`);
    };

    /**
     * Register a simple TCP task on server
     * @param {*} task 
     */
    task(task) {
        net.createServer(socket => {
            socket.on('data', async data => {
                let message = await json(data);
                task(message, socket);
            });
        }).listen(this.port, this.host);
    };

    /**
     * Register a multiple tasks on server
     * @param {*} jobs 
     */
    multiTask(jobs) {

        jobs.forEach(job => this.actions[job.name] = job.task);

        net.createServer(socket => {
            socket.on('data', async data => {
                const message   = await data.toString('utf8').replace(/[\n\r]*$/, '');
                const action    = await message.replace(/ .*/,'');
                const payload   = await json(message.substr(message.indexOf(" ") + 1));
                if (this.actions[action]) this.actions[action](payload, socket);
            });
        }).listen(this.port, this.host);

    }
}

module.exports = Server;
