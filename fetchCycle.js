const global = require('./global')
const axios = require('axios')

const conf = require('./conf/conf')
const User = require('./model/User')


const updateViewerPoints = function(viewer) {
    User.findOne({'name': viewer})
        .exec(function (err, user) {
            if (user) {
                User.findOneAndUpdate({'name': viewer}, {name: user.name, points: user.points + 10})
                    .exec(function (err, user) {})
            } else {
                const user = new User({name: viewer, points: 10})
                user.save().then(() => {})
            }
        })
}

const update = function() {
    axios.get('https://api.twitch.tv/helix/streams?user_login=leeachaan', {
        headers: {
            Authorization: `OAuth ${global.accessToken}`,
            'Client-ID': conf.clientId
        }
    })
        .then(res => {
            if (res.data.data.length > 0) {
                axios.get(`http://tmi.twitch.tv/group/user/leeachaan/chatters`)
                    .then(res => res.data && res.data.chatters &&
                        [...res.data.chatters.viewers, ...res.data.chatters.moderators].forEach(updateViewerPoints))
            }
        })

}


module.exports = {update}