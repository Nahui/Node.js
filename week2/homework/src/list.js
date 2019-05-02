'use strict';

const fs = require('fs');

const read = function() {
    return new Promise(resolve =>
        fs.readFile('./toDoList.txt', 'UTF-8', (err, data) => {
            resolve(err ? '' : data);
        })
    );
};

/* const read = function() {
    fs.readFile('./toDoList.json', 'UTF-8', (err, fileContents) => {
        if (err) {
            console.error(err);
            return;
        }
        try {
            const data = JSON.stringify(fileContents);
            console.log(`Things to do:\n${data}`);
        } catch (err) {
            console.error(err);
        }
    });
}; */

module.exports = read;