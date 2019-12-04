const express = require('express')
const Config = require('../model/Config')
const conf = require('../conf/conf')
const {fetchUserById} = require('../requests/requests')

const app = express()

const follow_message_ids = new Set()

const startWebServer = client => {
  app.use(express.json())

  app.get('/follower', (req, res) => {
    res.send(req.query['hub.challenge'])
  })

  Config.findOne({})
    .exec((err, config) => {
      app.post('/follower', (req, res) => {
        if (!follow_message_ids.has(req.body.id)) {
          follow_message_ids.add(req.body.id)
          if (req.body.data && req.body.data.from_id) {
            fetchUserById(req.body.data.from_id).then(res => {
              if (res.data && res.data.data && res.data.data.length > 0) {
                const msg = `Vielen Dank @${res.data.data[0].display_name} für den Follow! Willkommen in LeeaChaan's Stream leeachHeart`
                client.say(conf.broadcasterChannelName, msg)
              }
            })
          }
        }
        res.send()
      })
    })

  app.listen(conf.port, () => {
    console.log(`Web server listening on port ${conf.port}.`)
  })

}

module.exports = {startWebServer}

