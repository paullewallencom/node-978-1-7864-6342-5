var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var chargingLocationSchema = new Schema({
        values: {
            type: Array,
            required: [true, 'Why no values? Always provide values!']
        }, 
        chargingHours: {
            type: Number,
            min: 0.1,
            max: [24, 'There are only 24 hours in a day!']
        }
}, { collection: 'charging_locations' });

chargingLocationSchema.methods.checkForSameChargingHours = function(cb) {
    this.model('ChargingLocations').findOne({
        chargingHours: this.chargingHours
    }, function(err, val) {
        cb(!!val);
    })
}

module.exports = mongoose.model('ChargingLocations', chargingLocationSchema);