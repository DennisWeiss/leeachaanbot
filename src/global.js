const mongoose = require('mongoose')
const Security = require('./model/Security')
const axios = require('axios')

const conf = require('./conf/conf')

let accessToken = null
let broadcasterId = null

const refreshToken = () => new Promise((resolve, reject) => {
  Security.findOne({})
    .exec((err, security) => {
      if (security) {
        axios.post(`https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refersh_token=${security.refreshToken}&client_id=${conf.clientId}&client_secret=${conf.clientSecret}`)
          .then(res => {
            security.accessToken = res.data.access_token
            security.refreshToken = res.data.refresh_token
            security.save().then(resolve)
          })
          .catch(reject)
      } else {
        console.error('Could not get refresh token.')
        reject()
      }
    })
})

module.exports = {accessToken, broadcasterId, refreshToken}