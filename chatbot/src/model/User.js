const mongoose = require('mongoose')


const User = mongoose.model('User', {
  userId: String,
  name: String,
  displayName: String,
  profilePictureUrl: String,
  points: Number
})

module.exports = User