const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')


// Go to create new todo page
router.get('/new', (req, res) => {
  // 建議都加上 return 
  return res.render('new')
})

// Check detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// Create todo
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  // const todo = new Todo({ name })
  // return todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))

  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Go to edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// Send the edit from
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ _id, userId })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

// Delete item
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router