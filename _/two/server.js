const http = require('http'),
        url = require('url'),
        fs = require('fs'),
        read = require('./read');

const hostname = '127.0.0.1';
const port = 3000;

let serving_data = {};

const handlers = [];

handlers['/'] = (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(serving_data.data));
}

handlers['/first'] = (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(serving_data.data[0]));
}

handlers['/second'] = (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(serving_data.data[1]));
}

handlers['/about'] = (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('video course content');
}

const server = http.createServer((request, response) => {
    var pathname = url.parse(request.url, true).pathname;

    if (handlers[pathname]) {
        handlers[pathname](request, response);
    } else {
        response.statusCode = 404;
        response.end('Not found');
    }
    
    
});

let listen = new Promise(function(resolve, reject) {
    try {
        server.listen(port, hostname, () => {
            resolve(`Server running at http://${hostname}:${port}/`);
        })
    } catch(error) {
        reject(error);
    }
})

async function start() {
    try {
        serving_data = await read('charging_locations.json');
        serving_data = JSON.parse(serving_data);
        console.log(await listen);
    } catch (error) {
        console.error(error);
    }
    return serving_data;
}

start().then((data) => console.log(data));

module.exports = {handlers: handlers, data: serving_data};