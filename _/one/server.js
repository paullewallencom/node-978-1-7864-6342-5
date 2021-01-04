const http = require('http'),
      url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const arr_stations = [{ id:'1', where: 'london', address:'fifth avenue 55', type: 'electric charger' }, 
{ id:'2', where: 'new york', address:'fifth avenue 55', type: 'electric charger' }
]

const handlers = [];

handlers['/'] = (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(arr_stations));
}

handlers['/first'] = (request, response) => {
    response.statusCode = 200;
    // response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(arr_stations[0]));
}

handlers['/second'] = (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(arr_stations[1]));
}

handlers['/about'] = (request, response) => {
    response.statusCode = 200;
    //response.setHeader('Content-Type', 'text/plain');
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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = {handlers: handlers, data: arr_stations};