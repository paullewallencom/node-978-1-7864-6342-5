const fs = require('fs');

let content;

try {
    console.log('before reading');
    fs.readFile('text.txt', 'utf-8', function(err, data) {
        if (err) return;
        console.log(data);
    });
    console.log('after reading');
} catch (err) {
    console.log(err);
}