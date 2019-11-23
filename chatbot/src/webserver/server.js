import express from 'express'
import conf from '../conf/conf'

const app = express()

app.get('/follower', (req, res) => {
  res.send(req.query['hub.challenge'])
})

app.post('/follower', (req, res) => {
  console.log(req)
  res.send()
})

app.listen(conf.port, () => {
  console.log(`Web server listening on port ${conf.port}.`)
})
