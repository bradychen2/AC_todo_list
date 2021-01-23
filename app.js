const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send("This is main page")
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})