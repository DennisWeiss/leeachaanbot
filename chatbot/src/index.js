const tmi = require('tmi.js')
const axios = require('axios')
const mongoose = require('mongoose')
const Security = require('./model/Security')
const User = require('./model/User')

const conf = require('./conf/conf')

const global = require('./global')
const commandHandle = require('./commandHandle')
const fetchCycle = require('./fetchCycle')


// Define configuration options
const opts = {
  options: {
    debug: true
  },
  connection: {
    cluster: 'aws',
    reconnect: true
  },
  identity: {
    username: conf.botUsername,
    password: conf.botOAuthPassword
  },
  channels: [conf.broadcasterChannelName]

}

mongoose.connect('mongodb://localhost:27017/leeachaanbot', {useNewUrlParser: true})

// Create a client with our options
const client = new tmi.client(opts)

// Register our event handlers (defined below)
client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

// Connect to Twitch:
client.connect()

// Get access token for Twitch API
Security.findOne({})
  .exec((err, security) => {
    if (security) {
      global.accessToken = security.accessToken
    } else {
      const security = new Security({accessToken: conf.accessToken, refreshToken: conf.refreshToken})
      security.save().then(() => {
      })
    }
  })

axios.get(`https://api.twitch.tv/helix/users?login=${conf.broadcasterChannelName}`, {
  headers: {
    'Client-ID': conf.clientId
  }
}).then(res => {
  if (res.data && res.data.data && res.data.data.length > 0) {
    global.broadcasterId = res.data.data[0].id
  }
})

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim()

  commandHandle.handleCommand(client, target, context, commandName)
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}


User.find({})
  .exec((err, users) => {
    users.forEach(user => {
      axios.get(`https://api.twitch.tv/helix/users?login=${user.name}`, {
        headers: {
          'Client-ID': conf.clientId
        }
      })
        .then(res => {
          if (res.data && res.data.data && res.data.data.length > 0) {
            user.userId = res.data.data[0].id
            user.save().then(() => {})
          }
        })
    })
  })


setInterval(fetchCycle.update, conf.currency.iterationCycleInMs)