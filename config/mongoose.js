const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo_list'
// Setup connection
mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

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