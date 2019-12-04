const axios = require('axios')
const Config = require('../model/Config')

let config = null

Config.findOne({}).exec((err, _config) => config = _config)


const fetchUserById = userId => axios.get(`https://api.twitch.tv/helix/users?id=${userId}`, {
  headers: {
    'Client-ID': config.clientId
  }
})

module.exports = {fetchUserById}