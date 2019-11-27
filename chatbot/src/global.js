const mongoose = require('mongoose')
const Security = require('./model/Security')
const Config = require('./model/Config')
const axios = require('axios')

const conf = require('./conf/conf')

let accessToken = null
let appAccessToken = null
let broadcasterId = null

let config = null

Config.findOne({}).exec((err, _config) => config = _config)

const refreshToken = () => new Promise((resolve, reject) => {
	console.log('refreshing token')
  Security.findOne({})
    .exec((err, security) => {
      if (security) {
        axios.post(`https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${security.refreshToken}&client_id=${config.clientId}&client_secret=${config.clientSecret}`)
          .then(res => {
            console.log(res.data)
            security.accessToken = res.data.access_token
            security.refreshToken = res.data.refresh_token
            security.save().then(resolve)
          })
          .catch(err => {
			  console.log('err')
		  reject()
		  })
      } else {
        console.error('Could not get refresh token.')
        reject()
      }
    })
})

const refreshAppAccessToken = () => new Promise((resolve, reject) => {
  console.log('Refreshing app access token')
  axios.post(`https://id.twitch.tv/oauth2/token?client_id=${config.clientId}&client_secret=${config.clientSecret}&grant_type=client_credentials&scope=bits:read+channel:read:subscriptions+channel_subscriptions`)
    .then(res => {
      if (res.data) {
        resolve(res.data.access_token)
      } else {
        reject()
      }
    })
    .catch(reject)
})

const refreshSubscriptions = (broadcasterId, appAccessToken) => {
  console.log('Refreshing subscriptions with token ' + appAccessToken)
  axios.post(`https://api.twitch.tv/helix/webhooks/hub?hub.callback=${conf.hostname}:${conf.port}/follower&hub.mode=subscribe&hub.topic=https://api.twitch.tv/helix/users/follows?to_id=${broadcasterId}&hub.lease_seconds=864000`, null, {
    headers: {
      Authorization: `Bearer ${appAccessToken}`
    }
  })
    .then(res => {
      if (res.status === 202) {
        console.log('Successfully refreshed subscription')
      }
    })
    .catch(console.error)
}

module.exports = {accessToken, appAccessToken, broadcasterId, refreshToken, refreshAppAccessToken, refreshSubscriptions}