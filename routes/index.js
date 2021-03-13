const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')

// Direct the URL '/' to home module
router.use('/', home)
// Direct the URL '/todos' to todos module
router.use('/todos', todos)
// Direct the URL '/users/' to users module
router.use('/users', users)

module.exports = router