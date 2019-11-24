const express = require('express')
const conf = require('../conf/conf')

const app = express()

app.get('/follower', (req, res) => {
  res.send(req.query['hub.challenge'])
})

app.post('/follower', (req, res) => {
  console.log(req.body)
  res.send()
})

app.listen(conf.port, () => {
  console.log(`Web server listening on port ${conf.port}.`)
})
