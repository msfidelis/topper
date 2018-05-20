'use strict';

const { Client } = require('./');
const client = new Client();

client.addServer('0.0.0.0', 4000);

setTimeout(() => {
    client.send('Sum', {numbers: [1,2]}).then(success => console.log(success.toString()));
}, 200)
