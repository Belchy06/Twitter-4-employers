 const express = require('express')
 const dotenv = require('dotenv')
 const mongoose = require('mongoose')
 const bodyParser = require('body-parser')
 const users = require('./routes/users')
 const cors = require('cors')
 const passport = require('passport')

 // Setup Environment
 dotenv.config()

 // Mongoose Setup
 mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

 const app = express()

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(cors())
 
 app.use(passport.initialize())
 require('./config/passport')(passport)
 
 app.use('/api/users', users) 

 // Run App
 const PORT = process.env.PORT || 5000
 app.listen(PORT, () => console.log('Server is running on port ' + PORT))
