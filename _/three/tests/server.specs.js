const assert = require('assert'),
    // {handlers, data} = require('../server'),
    expect = require('chai').expect,
    stream = require('stream');

describe('Array', () => {
    describe('#indexOf', () => {
        it('should return -1 when the value is not present', () => {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    })
})