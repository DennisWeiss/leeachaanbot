const mongoose = require('mongoose')
const Security = require('./model/Security')
const axios = require('axios')

const conf = require('./conf/conf')

let accessToken = null
let appAccessToken = null
let broadcasterId = null

const refreshToken = () => new Promise((resolve, reject) => {
	console.log('refreshing token')
  Security.findOne({})
    .exec((err, security) => {
      if (security) {
        axios.post(`https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${security.refreshToken}&client_id=${conf.clientId}&client_secret=${conf.clientSecret}`)
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
  console.log('refreshing app access token')
  axios.post(`https://id.twitch.tv/oauth2/token?client_id=${conf.clientId}&client_secret=${conf.clientSecret}&grant_type=client_credentials&scope=bits:read+channel:read:subscriptions+channel_subscriptions`)
    .then(res => {
      if (res.data) {
        resolve(res.data.accessToken)
      } else {
        reject()
      }
    })
    .catch(reject)
})

const refreshSubscriptions = () => {
  console.log('refreshing subscriptions with token ' + appAccessToken)
  axios.post('https://api.twitch.tv/helix/webhooks/hub', {
    'hub.callback': `${conf.hostname}:${conf.port}/follower`,
    'hub.mode': 'subscribe',
    'hub.topic': `https://api.twitch.tv/helix/users/follows?to_id=${broadcasterId}`,
    'hub.lease_seconds': 864000
  }, {
    headers: {
      Authorization: `Bearer ${appAccessToken}`
    }
  })
    .then(res => {
    })
}

module.exports = {accessToken, appAccessToken, broadcasterId, refreshToken, refreshAppAccessToken, refreshSubscriptions}