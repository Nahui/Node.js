'use strict';

// TODO: Write the homework code in this file
const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const { writeFile, readTodos } = require('./functions');

app.use(express.json()); // use middleware that returns a function that is called in each request. Reads data that comes in and transforms it into an object

app.get('/', (req, res) => {
  res.send('Home Page');
});

// read all todos, GET /todos
app.get('/todos', (req, res, next) => {
  readTodos()
    .then(data => {
      res.json(data);
      res.end();
    })
    .catch(err => next(err));
});

// create new todo, POST /todos
app.post('/todos', (req, res, next) => {
  const { body = {} } = req;
  readTodos().then(todos => {
    const todoToAdd = body.todo;
    todoToAdd.id = uuidv4();
    todoToAdd.status = false;
    todos.push(todoToAdd);
    writeFile(todos)
      .then(() => res.send(`Wrote ${body.todo.description}`)) // response we get bellow in postman
      .catch(err => next(err));
  });
});

// update or replace description, PUT /todos/:id
app.put('/todos/:id', (req, res, next) => {
  const updateId = req.params.id;
  const newTodoData = req.body.todo.description;
  readTodos()
    .then(todos => {
      const todoToUpdate = todos.find(todo => todo.id === updateId);
      todoToUpdate.description = newTodoData;
      return writeFile(todos);
    })
    .then(() => res.send(`Ùpdated ${updateId}`))
    .catch(err => next(err));
});

// delete specific id, DELETE /todos/:id
app.delete('/todos/:id', (req, res, next) => {
  const removeId = req.params.id;
  readTodos().then(todos => {
    const newTodos = todos.filter(todo => todo.id !== removeId);
    writeFile(newTodos)
      .then(() => res.send(`Removed ${removeId}`))
      .catch(err => next(err));
  });
});

// delete all, DELETE /todos
app.delete('/todos', (req, res, next) => {
  readTodos().then(todos => {
    const newTodos = [];
    writeFile(newTodos)
      .then(() => res.send(`Removed all`))
      .catch(err => next(err));
  });
});

// read specific id, GET /todos/:id
app.get('/todos/:id', (req, res, next) => {
  const oneTodo = req.params.id;
  readTodos()
    .then(todos => {
      const showTodo = todos.filter(todo => todo.id === oneTodo);
      res.json(showTodo);
      res.end();
    })
    .catch(err => next(err));
});

// set status to done, PUT /todos/:id/done
app.put('/todos/:id/done', (req, res, next) => {
  const doneId = req.params.id;
  readTodos()
    .then(todos => {
      const doneTodo = todos.find(todo => todo.id === doneId);
      doneTodo.status = true;
      return writeFile(todos);
    })
    .then(() => res.send(`Ùpdated status to done for ${doneId}`))
    .catch(err => next(err));
});

// set status to not done, PUT /todos/:id/notdone
app.put('/todos/:id/notdone', (req, res, next) => {
  const doneId = req.params.id;
  readTodos()
    .then(todos => {
      const doneTodo = todos.find(todo => todo.id === doneId);
      doneTodo.status = false;
      return writeFile(todos);
    })
    .then(() => res.send(`Ùpdated status to not done for ${doneId}`))
    .catch(err => next(err));
});

/* app.post('/todos/:id/done', (req, res, next) => {
    const { id } = req.params;
    markAsDone(id)
        .then(data => res.send(data))
        .catch(err => next(err));
});
app.delete('/todos/:id/done', (req, res, next) => {
    const { id } = req.params;
    markAsNotDone(id)
        .then(data => res.send(data))
        .catch(err => next(err));
}); */

// Error handling in json format
app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

// use env variable instead of fixed port
const port = process.env.PORT || 3000; // we can set up a variable in our process environment
app.listen(port, () => console.log(`Listening on port ${port}....`));
