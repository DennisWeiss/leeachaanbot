const global = require('./global')
const axios = require('axios')
const mongoose = require('mongoose');

const conf = require('./conf/conf')


mongoose.connect('mongodb://localhost:27017/leeachaanbot', {useNewUrlParser: true});

const User = mongoose.model('User', { name: String, points: Number});

const update = function() {
    axios.get('https://api.twitch.tv/helix/streams?user_login=nickithiim', {
        headers: {
            Authorization: `OAuth ${global.accessToken}`,
            'Client-ID': conf.clientId
        }
    })
        .then(res => {
            if (res.data.data.length > 0) {
                axios.get(`http://tmi.twitch.tv/group/user/nickithiim/chatters`)
                    .then(res => res.data && res.data.chatters && res.data.chatters.viewers.forEach(viewer => {
                        User.findOne({'name': viewer})
                            .exec(function (err, user) {
                                if (user) {
                                    console.log(`${viewer} exists`)
                                } else {
                                    const user = new User({name: viewer, points: 10})
                                    user.save().then(() => {})
                                }
                            })
                    }))
            }
        })

}


module.exports = {update}