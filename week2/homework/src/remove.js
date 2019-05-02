'use strict';

const fs = require('fs');
const reset = require('./reset');
// const append = require('./add');
// const read = require('./list');

const remove = function(number) {
    let listContent = fs.readFileSync('./toDoList.txt', 'UTF-8');
    let listLineArray = listContent.split('\n');

    if (listLineArray.length == 0) {
        console.log('The list is empty!');
    } else if (number >= 0 && number < listLineArray.length) {
        listLineArray.splice(number, 1);
        reset();
        listLineArray.forEach(item => {
            fs.appendFileSync('./toDoList.txt', item + '\n');
        });
    } else {
        console.log('You entered a wrong index number!');
    }
};

module.exports = remove;