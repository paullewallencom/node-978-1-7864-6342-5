module.exports = function(app, serving_data) {
    app.get('/api/', (request, response) => {
        response.statusCode = 200;
        response.json(serving_data.data);
    });

    // READ OF RESOURCE
    app.get('/api/s/:index', (request, response) => {
        let index = request.params.index;
        response.statusCode = 200;
        response.end(JSON.stringify(serving_data.data[index]));
    });

    // DELETE OF RESOURCE
    app.delete('/api/s/:index', (request, response) => {
        let index = request.params.index;
        response.statusCode = 200;
        delete serving_data.data[parseInt(index)];
        response.json();
    });

    // REPLACE OF RESOURCE
    app.put('/api/s/:index', (request, response) => {
        let index = request.params.index;
        response.statusCode = 200;
        serving_data.data[parseInt(index)] = {id: index, data: request.body};
        response.json(serving_data.data[parseInt(index)]);
    });

    // ADD RESOURCE
    app.post('/api/', (request, response) => {
        response.statusCode = 200;
        serving_data.data.push({id: serving_data.data.length, data: request.body});
        response.json(serving_data.data[serving_data.data.length-1]);
    });

    app.get('/api/error/', (request, response) => {
        setTimeout(() =>{
            request.abracadabra.crash = 'bleah';
        }, 100)
    })

    app.get('*', (request, response) => {
        response.status(404);
        response.send('Not found');
    });
}