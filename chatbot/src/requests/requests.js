const axios = require('axios')
const Config = require('../model/Config')
const Security = require('../model/Security')



const fetchUserById = userId => new Promise((resolve, reject) => {
  Config.findOne({}).exec((err, config) => {
    Security.findOne({}).exec((err, security) => {
      axios.get(`https://api.twitch.tv/helix/users?id=${userId}`, {
        headers: {
          'Client-ID': config.clientId,
          Authorization: `Bearer ${security.appAccessToken}`
        }
      })
        .then(resolve)
        .catch(reject)
    })
  })
})

module.exports = {fetchUserById}