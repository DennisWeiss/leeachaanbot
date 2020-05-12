const axios = require('axios')
const Config = require('../model/Config')
const Security = require('../model/Security')

let config = null
let security = null


Config.findOne({}).exec((err, _config) => config = _config)
Security.findOne({}).exec((err, _security) => security = _security)


const fetchUserById = userId => axios.get(`https://api.twitch.tv/helix/users?id=${userId}`, {
  headers: {
    'Client-ID': config.clientId,
    Authorization: `Bearer ${security.appAccessToken}`
  }
})

module.exports = {fetchUserById}