'use strinct';
const fs = require('fs');
const uuid = require('uuid/v4');
const list = {};
const STORE_FILE_NAME = 'toDoList.txt';

function writeFile(data) {
  return new Promise((resolve, reject) =>
    fs.writeFile(STORE_FILE_NAME, JSON.stringify(data), (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );
}

function readTodos() {
  return new Promise(resolve =>
    fs.readFile(STORE_FILE_NAME, 'UTF-8', (err, data) => {
      resolve(err ? [] : JSON.parse(data.toString()));
    })
  );
}

/* function updateTodo(id, update) {
    // update a todo
    todoList.get[id];
    //todoList[id]
}

function deleteTodo() {
    // delete a todo
}

function markAsDone() {}

function markAsNotDone() {} */

module.exports = {
  writeFile,
  readTodos,
};
