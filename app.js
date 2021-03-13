const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const routes = require('./routes')
// Just need to be set, don't need assignment
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

// Establish a layout engine and pass in exphbs parameters
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// 啟用樣板引擎
app.set('view engine', 'hbs')
// Every requests need parsed by bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: "SuperSecretSecret",
  resave: false,
  saveUninitialized: true
}))
app.use(methodOverride('_method'))
usePassport(app)

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})