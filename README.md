
# Installation

```bash
npm install topper
```

## Create a simple TCP Microservice

* Write a simple functions to receive an TCP Payload, and a server socket context and register on a Topper Server instance.

```javascript

const { Server } = require('topper');
const server = new Server('0.0.0.0', 4000);

const task = async (data, server) => {
    console.log(`New message!`);
    await server.write(`Message payload: ${data}`);
}

server.task(task);

```

### Client Console

```bash
nc localhost 4000
ˆ
verything is connected, Todd...
Message payload: verything is connected, Todd...
```

### Server console output 

```bash
node app.js
New task registered on tcp://localhost:4000
New message!
```

## Send an JSON message to your TCP Microservice 

* Write a function to receive an JSON string and execute some actions with payload

```javascript
const { Server } = require('topper');
const server = new Server('0.0.0.0', 4000);

const task = async (data, server) => {
    server.write(`hello, my name is ${data.name} and i'm ${data.age} old\n`);
}

server.task(task);

```

```bash
nc localhost 4000
{"name": "Matheus Fidelis", "age":22}
hello, my name is Matheus Fidelis and i'm 22 old
```