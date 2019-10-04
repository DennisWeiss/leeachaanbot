const mongoose = require('mongoose')


const CustomCommand = mongoose.model('CustomCommand', {
  commandHandles: [String],
  response: String,
  showTwitchHandle: Boolean
})

module.exports = CustomCommand
