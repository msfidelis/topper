
# Architecture Benchmark

### Benchmark Tool

Benchmark Tool: [Autocannon HTTP/1.1 benchmarking tool](https://github.com/mcollina/autocannon)

```bash
autocannon -c 20 -a 5000  -m POST --body '{"numbers": [1, 2, 3, 4, 5, 6, 7, 8, 9]}' --headers 'Content-Type:Application/json' http://localhost:9000/sum
```

### REST to REST 

* Express API Endpoint --> Express REST Microservice

```
Stat         Avg    Stdev Max
Latency (ms) 76.52  22.53 234.85
Req/Sec      250    50.99 320
Bytes/Sec    112 kB 23 kB 144 kB

5k requests in 20s, 2.25 MB read
```

### REST to Topper

* Express API Endpoint --> Topper TCP Microservice

```
Stat         Avg    Stdev  Max
Latency (ms) 24.16  6.4    98.45
Req/Sec      714.29 244.42 919
Bytes/Sec    312 kB 107 kB 402 kB

5k requests in 7s, 2.19 MB read
```

# Installation

```bash
npm install topper
```

## Create a simple TCP Microservice

* Write a simple functions to receive an TCP Payload, and a server socket context and register on a Topper Server instance.

```javascript

const { Server } = require('topper');
const server = new Server('0.0.0.0', 4000);

const task = async (data, socket) => {
    console.log(`New message!`);
    await socket.write(`Message payload: ${data}`);
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

const task = async (data, socket) => {
    socket.write(`hello, my name is ${data.name} and i'm ${data.age} old\n`);
}

server.task(task);

```

```bash
nc localhost 4000
{"name": "Matheus Fidelis", "age":22}
hello, my name is Matheus Fidelis and i'm 22 old
```


## Create a Multi Task Microservice

Create some arrays with task definitions and register on your server

```javascript
const { Server } = require('./');
const server = new Server('0.0.0.0', 4000);


const tasks = [
    {
        name: 'Ping',
        task: async (data, server) => await server.write('Pong\n')
    },
    {
        name: 'Sum',
        task: async (data, server) => {
            let sum = data.numbers.reduce((prev, curr) => prev + curr);
            await server.write(`The sum is: ${sum} \n`);
        }
    }
]

server.multiTask(tasks);
```

### Client console

```bash
echo 'Sum {"numbers": [1, 2, 3, 4, 5]}' | nc localhost 4000
```

```bash
echo 'Ping' | nc localhost 4000
```

Output:

```
The sum is: 15
```

```
Pong
```

## Create a simple client

```javascript
const { Client } = require('topper');
const client = new Client();

client.addServer('0.0.0.0', 4000);

client.send('Sum', {numbers: [1,2]})
    .then(success => console.log(success.toString()));
```
