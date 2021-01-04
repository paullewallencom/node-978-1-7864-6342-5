var MongoClient = require('mongodb').MongoClient,
    read = require('./read');

let url = 'mongodb://localhost:27017/local';

MongoClient.connect(url, function(err, db) {
    if (err) return;

    read('./charging_locations.json').then((result) => {
        let jsonContent = JSON.parse(result);

        db.collection('charging_locations', (err, collection) => {
            if (err) return;
            
            // build our arr to insert into mongoDB
            let insertedObject = [];
            for (let dataRow of jsonContent.data) {
                let doc = {};
                doc.values = dataRow;
                insertedObject.push(doc);
            }
            collection.insertMany(insertedObject);
        })
    })
})