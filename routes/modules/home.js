const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  // Find all the Todo data, clean, and transfer it to an JavaScript data array
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(todos => {
      res.render('index', { todos: todos })
    })
    .catch(error => console.log(error))
})

module.exports = router