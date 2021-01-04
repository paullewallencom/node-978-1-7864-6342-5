const http = require('http'),
        url = require('url'),
        fs = require('fs'),
        read = require('./read'),
        express = require('express'),
        api = require('./api'),
        bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;

let serving_data = {};

var app = express();

app.set('view engine', 'pug');

app.use(function(request, response, next) {
    console.log('request on path ' + request.path);
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/about', (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.send('video course content');
});

/* app.get('/', (request, response) => {
   response.render('index', {title:'hello to location charging', message: 'Here you can view all the charging locations'}); 
});*/

app.get('/charging', (request, response) => {
   response.render('charging', serving_data); 
});

let listen = new Promise(function(resolve, reject) {
    try {
        app.listen(port, hostname, () => {
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
        api(app, serving_data);
        console.log(await listen);
    } catch (error) {
        console.error(error);
    }
    return serving_data;
}

start().then((data) => console.log(data));

module.exports = app;