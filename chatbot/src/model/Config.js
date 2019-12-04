const mongoose = require('mongoose')


const Config = mongoose.model('Config', {
  clientId: String,
  clientSecret: String,
  accessToken: String,
  refreshToken: String,
  redirectUri: String,
  broadcasterChannelName: String,
  botUsername: String,
  botOAuthPassword: String,
  donationCurrency: String,
  currency: {
    nameSingular: String,
    namePlural: String,
    iterationCycleInMs: Number,
    pointsPerViewIteration: Number,
    followerMultiplier: Number,
    subscriberMultiplier: Number
  },
  excludedUsers: [String]
})

module.exports = Config