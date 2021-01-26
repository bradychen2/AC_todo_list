const express = require('express')
const mongoose = require('mongoose')

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

app.get('/', (req, res) => {
  res.send("This is main page")
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})