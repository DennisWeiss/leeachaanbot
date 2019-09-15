const mongoose = require('mongoose')


const Security = mongoose.model('Security', {refreshToken: String, accessToken: String})

module.exports = Security
