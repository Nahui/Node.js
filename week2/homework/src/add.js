'use strict';

const fs = require('fs');

const append = function(...element) {
    return new Promise((resolve, reject) =>
        fs.appendFile('./toDoList.txt', `${element.join(' ')}\n`, (err, data) =>
            err ? reject(err) : resolve(data)
        )
    );
};

module.exports = append;