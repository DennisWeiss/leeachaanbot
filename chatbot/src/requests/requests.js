const axios = require('axios')
const conf = require('../conf/conf')


const fetchUserById = userId => axios.get(`https://api.twitch.tv/helix/users?id=${userId}`, {
  headers: {
    'Client-ID': conf.clientId
  }
})

module.exports = {fetchUserById}