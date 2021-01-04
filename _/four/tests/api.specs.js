const request = require('supertest');
const should = require('should');
const assert = require('assert');
// const app = require('../server');

describe('our api tests to handle charing locations', () => {
    
    /* const agent = request.agent(app);

    it('respond with json', function() {
        return agent.get('/api/').set('Accept', 'application/json').expect(200).then((response) => {
            should.exist(response);
        });
    });

    it('respond with json from our 1 result', function() {
        return agent.get('/api/s/1').set('Accept', 'application/json').expect(200).then((response) => {
            should.exist(response);
            assert(response.body, require('../charging_locations.json').data[1]);
        });
    });

    it('put method from our 1 result', function() {
        let obj = {'some': 'data'};
        return agent.put('/api/s/1').set('Accept', 'application/json').send(obj).expect(200).then((response) => {
            should.exist(response);
            assert(response.body, {id: 1, data: obj});
        });
    });*/
})