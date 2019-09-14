const global = require('./global')
const axios = require('axios')

const conf = require('./conf/conf')
const User = require('./model/User')


const userExcluded = username => [conf.broadcasterChannelName, conf.botUsername, ...conf.excludedUsers].includes(username)

const updateViewerPoints = function (userId, username) {
  if (!userExcluded(username)) {
    User.findOne({userId})
      .exec(function (err, user) {
        if (user) {
          User.findOneAndUpdate({userId}, {
            name: user.name, points: user.points +
              conf.currency.pointsPerViewIteration
          })
            .exec(function (err, user) {
            })
        } else {
          const user = new User({userId, name: username, points: conf.currency.pointsPerViewIteration})
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
      if (res.data && res.data.data && res.data.data.length > 0) {
        axios.get(`http://tmi.twitch.tv/group/user/${conf.broadcasterChannelName}/chatters`)
          .then(res => res.data && res.data.chatters &&
            [...res.data.chatters.viewers, ...res.data.chatters.moderators].forEach(username => {
              axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
                headers: {
                  'Client-ID': conf.clientId
                }
              }).then(res => {
                if (res.data && res.data.data && res.data.data.length > 0) {
                  updateViewerPoints(res.data.data[0].id, username)
                }
              })
            }))
      }
    })

}


module.exports = {update}