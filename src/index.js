const tmi = require('tmi.js');
const axios = require('axios')
const mongoose = require('mongoose');

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
  channels: [/*conf.broadcasterChannelName*/ 'dennisweiss']

};

mongoose.connect('mongodb://localhost:27017/leeachaanbot', {useNewUrlParser: true});

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Get access token for Twitch API
axios.post(`https://id.twitch.tv/oauth2/token?client_id=${conf.clientId}&client_secret=${conf.clientSecret}&grant_type=authorization_code&redirect_uri=http://localhost&code=${conf.authorizationCode}`)
    .then(res => {
        if (res.status === 200) {
            global.accessToken = res.data.access_token
        } else {
            console.error('Failed to retrieve access token!')
        }
      console.log('accessToken', global.accessToken)
    })
  .catch(console.error)

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
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    commandHandle.handleCommand(client, target, context, commandName);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}


setInterval(fetchCycle.update, 10000)