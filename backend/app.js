const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./config/database')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', userRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})