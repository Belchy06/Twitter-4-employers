const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  login: {
    type: String,
    required: true
  },
  handle: {
    type: String,
  },
  password: {
    type: String,
  },
  followers: [],
  following: [],
  likes: [],
  joinedDate: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('User', userSchema)