'use strict';

const fs = require('fs');

const reset = function() {
    fs.unlink('./toDoList.txt', function(err) {
        if (err) throw err;
    });
};

module.exports = reset;