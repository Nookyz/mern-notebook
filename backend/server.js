const express = require('express')
const mongoose = require('mongoose')
const color = require('colors')
const config = require('config')
const app = express()
const port = config.get('port') || 5000

app.use(express.json())

app.use('/auth', require('./routes/auth.routes'))
app.use('/notes', require('./routes/note.routes'))


async function start(){
  try {
    await mongoose.connect(config.get('mongoUri'),{
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    },
    () => console.log('MongoBB database connection established successfully'.green))

    app.listen(port, () => {
      console.log(`App starting on port ${port}...`.blue)
    })
  } catch (e) {

    console.log('Server error'.red, e.message)
    process.exit(1)
    
  }
}

start()