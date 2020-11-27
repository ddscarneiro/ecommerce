const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(
  process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
})