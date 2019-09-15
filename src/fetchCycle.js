const global = require('./global')
const axios = require('axios')

const conf = require('./conf/conf')
const User = require('./model/User')


const userExcluded = username => [conf.broadcasterChannelName, conf.botUsername, ...conf.excludedUsers].includes(username)

const updateViewerPoints = function (userId, username, multiplier = 1) {
  if (!userExcluded(username)) {
    User.findOne({userId})
      .exec(function (err, user) {
        if (user) {
          User.findOneAndUpdate({userId}, {
            name: user.name, points: user.points + multiplier * conf.currency.pointsPerViewIteration
          })
            .exec(function (err, user) {
            })
        } else {
          const user = new User({userId, name: username, points: multiplier * conf.currency.pointsPerViewIteration})
          user.save().then(() => {
          })
        }
      })
  }
}

const update = function () {
  axios.get(`https://api.twitch.tv/helix/streams?user_login=${conf.broadcasterChannelName}`, {
    headers: {
      'Client-ID': conf.clientId
    }
  })
    .then(res => {
      if (res.data && res.data.data && res.data.data.length > 0 || true) {
        axios.get(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${global.broadcasterId}`, {
          headers: {
            'Authorization': `Bearer ${global.accessToken}`
          }
        }).then(res => {
          if (res.status === 401) {
            global.refreshToken().then(() => update())
          }
          const subscribers = res.data && res.data.data ?
            new Set(res.data.data.map(subscription => subscription.user_id)) : new Set()
          axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${global.broadcasterId}`, {
            headers: {
              'Client-ID': conf.clientId
            }
          })
            .then(res => {
              const followers = res.data && res.data.data ?
                new Set(res.data.data.map(follow => follow.from_id)) : new Set()
              axios.get(`http://tmi.twitch.tv/group/user/${conf.broadcasterChannelName}/chatters`)
                .then(res => res.data && res.data.chatters &&
                  [...res.data.chatters.viewers, ...res.data.chatters.moderators].forEach(username => {
                    axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
                      headers: {
                        'Client-ID': conf.clientId
                      }
                    }).then(res => {
                      if (res.data && res.data.data && res.data.data.length > 0) {
                        const userId = res.data.data[0].id
                        updateViewerPoints(
                          userId,
                          username,
                          subscribers.has(userId) ? conf.currency.subscriberMultiplier : followers.has(userId)
                            ? conf.currency.followerMultiplier : 1
                        )
                      }
                    })
                  }))
            })
        })
      }
    })

}


module.exports = {update}