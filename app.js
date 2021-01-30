const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
// Just need to be set, don't need assignment
require('./config/mongoose')

const app = express()
const port = 3000

// Establish a layout engine and pass in exphbs parameters
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// 啟用樣板引擎
app.set('view engine', 'hbs')
// Every requests need parsed by bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})