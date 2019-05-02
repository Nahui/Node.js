'use strict';

const fs = require('fs');

const help = function() {
    return new Promise(resolve =>
        fs.readFile('./helpFile.txt', 'UTF-8', (err, data) => resolve(err ? '' : console.log(data)))
    );
};

module.exports = help;