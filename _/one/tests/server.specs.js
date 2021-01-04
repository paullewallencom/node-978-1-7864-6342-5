const assert = require('assert'),
    {handlers, data} = require('../server'),
    expect = require('chai').expect,
    stream = require('stream');

describe('Array', () => {
    describe('#indexOf', () => {
        it('should return -1 when the value is not present', () => {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    })
})

describe('Server routing', () => {
    it('should return the first result out the array in /first call', (done) => {
        let request = {};
        let response = new stream.Writable({
            write: (chunk, encoding, next) => {
                expect(chunk.toString()).to.be.eq(JSON.stringify(data[0]))
                next();
                done();
            }
        });
        response.setHeader = (name, value) => {};
        handlers['/first'](request, response);
    });
})