const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./config/database')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api/users/', userRoutes)
app.use('/api/categories/', categoryRoutes)
app.use('/api/products/', productRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})