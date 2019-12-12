const global = require('./global')
const axios = require('axios')
const User = require('./model/User')
const Security = require('./model/Security')
const Config = require('./model/Config')


let config = null

Config.findOne({}).exec((err, _config) => config = _config)

const userExcluded = username => [config.broadcasterChannelName, config.botUsername, ...config.excludedUsers].includes(username)

const updateViewerPoints = function (userId, username, multiplier = 1) {
  if (!userExcluded(username)) {
    User.findOne({userId})
      .exec(function (err, user) {
        if (user) {
          User.findOneAndUpdate({userId}, {
            name: user.name, points: user.points + multiplier * config.currency.pointsPerViewIteration
          })
            .exec(function (err, user) {
            })
        } else {
          const user = new User({userId, name: username, points: multiplier * config.currency.pointsPerViewIteration})
          user.save().then(() => {
          })
        }
      })
  }
}

const fetchFollowers = paginationCursor => new Promise((resolve, reject) => {
  axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${global.broadcasterId}&first=100`
  + (paginationCursor != null ? `&after=${paginationCursor}` : ''), {
    headers: {
      'Client-ID': config.clientId
    }
  })
    .then(res => {
      if (res.data.pagination && res.data.data && res.data.data.length > 0) {
        fetchFollowers(res.data.pagination.cursor)
          .then(followers => resolve([...followers, ...res.data.data.map(follower => follower.from_id)]))
      } else {
        resolve([])
      }
    })
    .catch(err => console.log(err))
})


const update = function () {
  axios.get(`https://api.twitch.tv/kraken/streams/${global.broadcasterId}`, {
    headers: {
      'Client-ID': config.clientId,
      Accept: 'application/vnd.twitchtv.v5+json'
    }
  })
    .then(res => {
      Security.findOne({})
        .exec((err, security) => {
          if (res.data && res.data.stream) {
            axios.get(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${global.broadcasterId}`, {
              headers: {
                'Authorization': `Bearer ${security.accessToken}`
              }
            }).then(res => {
              if (res.status === 401) {
                global.refreshToken().then(() => update())
              }
              const subscribers = res.data && res.data.data ?
                new Set(res.data.data.map(subscription => subscription.user_id)) : new Set()
              fetchFollowers()
                .then(followersList => {
                  const followers = new Set(followersList)
                  axios.get(`http://tmi.twitch.tv/group/user/${config.broadcasterChannelName}/chatters`)
                    .then(res => res.data && res.data.chatters &&
                      [...res.data.chatters.viewers,
                        ...res.data.chatters.moderators,
                        ...res.data.chatters.vips,
                        ...res.data.chatters.staff,
                        ...res.data.chatters.admins,
                        ...res.data.chatters.global_mods].forEach(username => {
                        console.log('online: ' + username)
                        axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
                          headers: {
                            'Client-ID': config.clientId
                          }
                        }).then(res => {
                          if (res.data && res.data.data && res.data.data.length > 0) {
                            const userId = res.data.data[0].id
                            console.log('user id: ' + userId)
                            updateViewerPoints(
                              userId,
                              username,
                              subscribers.has(userId) ? config.currency.subscriberMultiplier : followers.has(userId)
                                ? config.currency.followerMultiplier : 1
                            )
                          }
                        })
                      }))
                })
            })
              .catch(err => {
                console.log('error')
                global.refreshToken().then(() => update())
              })
          }
        })
    })

}


module.exports = {update}
