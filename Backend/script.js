const connectMongo=require('./db')
connectMongo();

const express = require('express')
const app = express()
const port = 5000

//middleware
app.use(express.json())


//available routers
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


//this part is to listen to the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})