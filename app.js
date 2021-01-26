const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

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

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})