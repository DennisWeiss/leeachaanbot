const mongoose = require('mongoose')

const User = mongoose.model('User', {userId: Number, name: String, points: Number})


module.exports = User