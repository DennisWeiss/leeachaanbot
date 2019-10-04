const mongoose = require('mongoose')


const Command = mongoose.model('Command', {
  commandHandles: [String],
  response: String,
  showTwitchHandle: Boolean
})

module.exports = Command
