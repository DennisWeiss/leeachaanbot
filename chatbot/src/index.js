const tmi = require('tmi.js')
const axios = require('axios')
const mongoose = require('mongoose')
const Security = require('./model/Security')
const User = require('./model/User')
const Config = require('./model/Config')

const global = require('./global')
const commandHandle = require('./commandHandle')
const fetchCycle = require('./fetchCycle')
const {startWebServer} = require('./webserver/server')


mongoose.connect('mongodb://localhost:27017/leeachaanbot', {useNewUrlParser: true})

Config.findOne({})
  .exec((err, config) => {
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
        username: config.botUsername,
        password: config.botOAuthPassword
      },
      channels: [config.broadcasterChannelName]

    }

    // Create a client with our options
    const client = new tmi.client(opts)

    // Register our event handlers (defined below)
    client.on('message', onMessageHandler)
    client.on('connected', onConnectedHandler)

    // Connect to Twitch:
    client.connect()

    // Starting web server for retrieving Twitch subscriptions
    startWebServer(client)

    // Get access token for Twitch API
    Security.findOne({})
      .exec((err, security) => {
        if (security) {
          global.accessToken = security.accessToken
        } else {
          const security = new Security({accessToken: config.accessToken, refreshToken: config.refreshToken})
          security.save().then(() => {
          })
        }
      })

    axios.get(`https://api.twitch.tv/helix/users?login=${config.broadcasterChannelName}`, {
      headers: {
        'Client-ID': config.clientId
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

    console.log('Updating user points every ' + config.currency.iterationCycleInMs + ' ms')

    fetchCycle.update()

    setInterval(fetchCycle.update, config.currency.iterationCycleInMs)

    const refreshAppAccessTokenAndSubscriptions = () => {
      global.refreshAppAccessToken().then(appAccessToken => {
        global.appAccessToken = appAccessToken
        global.refreshSubscriptions(global.broadcasterId, appAccessToken)
        setTimeout(refreshAppAccessTokenAndSubscriptions, 24 * 60 * 60 * 1000)
      })
        .catch(err => setTimeout(refreshAppAccessTokenAndSubscriptions, 24 * 60 * 60 * 1000))
    }

    refreshAppAccessTokenAndSubscriptions()
  })



