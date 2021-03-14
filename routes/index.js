const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

// Direct the URL '/todos' to todos module
router.use('/todos', authenticator, todos)
// Direct the URL '/users/' to users module
router.use('/users', users)
// Direct the URL '/' to home module
router.use('/', authenticator, home)

module.exports = router