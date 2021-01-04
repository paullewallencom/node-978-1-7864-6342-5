var expect = require('chai').expect;
var ChargingLocations = require('../chargingLocationsModel');
var sinon = require('sinon');

describe('ChargingLocationsModel', function() {
    it('should be invalid if values is empty', function(done) {
        var cl = new ChargingLocations();

        cl.validate(function(err) {
            expect(err.errors.values).to.exist;
            done();
        })
    })

    it('should be invalid if chargingHours is bigger then 24', function(done) {
        var cl = new ChargingLocations({ values: [1], chargingHours: 25 });

        cl.validate(function(err) {
            expect(err.errors.chargingHours).to.exist;
            done();
        })
    })

    it('should check for chargingHours', function() {
        sinon.stub(ChargingLocations, 'findOne');
        var cl = new ChargingLocations({ values: [1], chargingHours: 10 });

        cl.checkForSameChargingHours(function() {});

        sinon.assert.calledWith(ChargingLocations.findOne, { chargingHours: 10 });
    })
})