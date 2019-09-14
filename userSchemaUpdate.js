const User = require('./src/model/User')
const axios = require('axios')
const conf = require('./src/conf/conf')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/leeachaanbot', {useNewUrlParser: true});

User.find({})
  .exec((err, users) => {
	  console.log(users)
    users.forEach(user => {
      axios.get(`https://api.twitch.tv/helix/users?login=${user.name}`, {
		  headers: {
			  'Client-ID': conf.clientId
			}
	  })
        .then(res => {
          if (res.data && res.data.data && res.data.data.length > 0) {
            user.userId = res.data.data[0].id
          }
		  console.log(user)
          user.save().then(() => {})
        })
    })
  })
