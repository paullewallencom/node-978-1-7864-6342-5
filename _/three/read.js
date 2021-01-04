const fs = require('fs');

module.exports = function(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, 'utf-8', function(err, buffer) {
            if (err) reject(err); else resolve(buffer);
        })
    })
}