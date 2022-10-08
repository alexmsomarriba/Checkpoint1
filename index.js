const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const data = require("./data/index")
const sampleUser = require("./data/sampleUser")
const users = require("./routes/users")
let counter = 0
const port = process.env.PORT || 4000

app.use(users)
app.get('/', (req, res) => res.send('default route'))

app.listen(port, () => {
  console.log('app is listening on:', port)
})