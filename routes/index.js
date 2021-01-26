const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')

// Direct the URL '/' to home module
router.use('/', home)
// Direct the URL '/todos' to todos module
router.use('/todos', todos)

module.exports = router