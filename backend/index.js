const connectTomongo = require("./db")
const express = require('express')
var cors = require('cors')




connectTomongo();

const app = express()
const port = 5000

app.use(cors())   //remove cors error
app.use(express.json())   //required for display json content into terminal window

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})