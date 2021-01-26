const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Todo = require('./models/todo')

// Setup connection
mongoose.connect('mongodb://localhost/todo_list', { useNewUrlParser: true, useUnifiedTopology: true })

// Get connected condition and assign to variable: db
const db = mongoose.connection

// Error listener
db.on('error', () => {
  console.log('mongodb error!')
})

// Open listener - successful connection
db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
const port = 3000

// Establish a layout engine and pass in exphbs parameters
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// 啟用樣板引擎
app.set('view engine', 'hbs')
// Every requests need parsed by bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  // Find all the Todo data, clean, and transfer it to an JavaScript data array
  Todo.find()
    .lean()
    .then(todos => {
      res.render('index', { todos: todos })
    })
    .catch(error => console.log(error))
})

// Go to create new todo page
app.get('/todos/new', (req, res) => {
  // 建議都加上 return 
  return res.render('new')
})

// Check detail
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  console.log(req.params)
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// Create todo
app.post('/todos', (req, res) => {
  const name = req.body.name
  // const todo = new Todo({ name })
  // return todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))

  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Go to edit page
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// Send the edit from
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// Delete item
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})