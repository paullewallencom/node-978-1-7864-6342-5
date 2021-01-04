var mongoose = require('mongoose')
    ChargingLocations = require('./chargingLocationsModel'),
    assert = require('assert');

module.exports = function(app, serving_data) {
let url = 'mongodb://localhost:27017/local';

mongoose.connect(url, {useMongoClient: true, promiseLibrary: global.Promise }).then((db) => {
    console.log('connected');
    
    app.get('/api/', (request, response) => {
        response.statusCode = 200;
        // response.json(serving_data.data);
        ChargingLocations.find({}, (err, locations) => {
            response.json(locations);
        })
    });

    // READ OF RESOURCE
    app.get('/api/s/:index', (request, response) => {
        let index = request.params.index;
        response.statusCode = 200;
        ChargingLocations.findById(index, (err, doc) => {
            if (err) response.send(err);
            response.json(doc);
        })
    });

    // DELETE OF RESOURCE
    app.delete('/api/s/:index', (request, response) => {
        let index = request.params.index;
        response.statusCode = 200;
        delete serving_data.data[parseInt(index)];
        ChargingLocations.findByIdAndRemove(index, {}, ()=>{
            response.send();
        })
    });

    // REPLACE OF RESOURCE
    app.put('/api/s/:index', (request, response) => {
        let index = request.params.index;
        response.statusCode = 200;
        ChargingLocations.findById(index, (err, doc) => {
            if (err) response.send(err);
            doc.values = request.body;
            doc.save((err) => {
                assert.equal(err.errors['values'].message, 'Path `values` is required.');
                assert.equal(err.errors['chargingHours'].message, 'Path `chargingHours` needs to be between 0 and 24.');
                if (err) response.send(err);
                else response.json(doc);
            });
        })
    });

    // ADD RESOURCE
    app.post('/api/', (request, response) => {
        let index = request.params.index;
        response.statusCode = 200;
        var chargingLocation = new ChargingLocations( request.body );
        chargingLocation.save((err) => {
                // assert.equal(err.errors['values'].message, 'Path `values` is required.');
                // assert.equal(err.errors['chargingHours'].message, 'Path `chargingHours` needs to be between 0 and 24.');
                if (err) response.send(err);
                else response.json(chargingLocation);
            });
    });

    app.get('/api/hours', (request, response) => {
        ChargingLocations.
            find({ }).
            where('chargingHours').gt(5).lt(20).
            where('values').in(['Canada']).
            limit(10).
            sort('-chargingHours').
            exec((err, result) => {
                response.json(result);
            });
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
});
}