const express = require('express')
const cookieParser = require('cookie-parser')
const authroutes = require('./routes/auth')
const movieRoutes = require('./routes/movieRoutes')
const tvRoutes = require('./routes/tv.route')
const protectRoute = require('./middleware/protectRoute')
const searchRoutes = require('./routes/searchroutes')
const cors = require('cors')

require('./mongoDb/connection')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(express.json()) // allow us to parse req.body
app.use(cookieParser())

app.use('/api', authroutes)
app.use('/movie', protectRoute, movieRoutes)
app.use('/tv', protectRoute, tvRoutes)
app.use('/search', protectRoute, searchRoutes)

app.listen(5000, () => console.log("server running")) 
