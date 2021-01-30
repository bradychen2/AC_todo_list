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

module.exports = db