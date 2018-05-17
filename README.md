
# Installation

```bash
npm install topper
```

## Create a simple TCP Microservice

* Write a simple functions to receive an TCP Payload, and a server socket context and register on a Topper Server instance.

```javascript

const { Server } = require('topper');
const server = new Server('0.0.0.0', 5000);

const task = async (data, server) => {
    console.log(`New message!`);
    await server.write(`Server Payload: message: ${data}`);
}

server.task(task);

```

### Client Console

```bash
nc localhost 4000

verything is connected, Todd...
Server Payload: message: verything is connected, Todd...
```

### Server console output 

```bash
node test.js
New task registered on tcp://localhost:4000
New message!
```