const mongoose = require('mongoose')

const User = mongoose.model('User', { name: String, points: Number});


module.exports = User