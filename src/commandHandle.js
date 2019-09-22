const global = require('./global')
const User = require('./model/User')
const Security = require('./model/Security')
const conf = require('./conf/conf')
const roulette = require('./model/roulette')
const translations = require('./conf/translations')
const axios = require('axios')


function help(client, target, username) {
  client.say(target, `@${username} Verfügbare Kommandos: !p, !dangos: Sagt dir wieviele 
  ${conf.currency.namePlural} du besitzt. !leaderboard, !rekord: Schau wer die meisten ${conf.currency.namePlural} gesammelt hat. 
  !gamble <1-100> Gib an wie viel % deiner ${conf.currency.namePlural} du mit einer 50/50 Chance vergamblen möchtest.`)
}

function dangos(client, target, userId, username) {
  User.findOne({userId})
    .exec(function (err, user) {
      const points = user ? user.points : 0
      client.say(target, `@${username} Du hast ${points} ${points === 1 ?
        conf.currency.nameSingular : conf.currency.namePlural}.`)
    })
}

const leaderboardMessagePart = (msg, index, user) => `${index + 1}. ${user.name} ${formatPoints(user.points)} `

function leaderboard(client, target, userId, username) {
  User.find({})
    .exec((err, users) => {
      const sortedUsers = [...users].sort((a, b) => b.points - a.points)
      let msg = `@${username} `
      for (let i = 0; i < Math.min(3, sortedUsers.length); i++) {
        msg += leaderboardMessagePart(msg, i, sortedUsers[i])
      }
      for (let i = 0; i < sortedUsers.length; i++) {
        if (sortedUsers[i].userId === userId) {
          if (i > 2) {
            msg += leaderboardMessagePart(msg, i, sortedUsers[i])
          }
          break
        }
      }
      client.say(target, msg)
    })
}

const gamble = (client, target, userId, username, betFraction) => {
    User.findOne({userId})
      .exec((err, user) => {
        if (user) {
          if (Math.random() >=  0.5) {
            user.points = Math.floor((1 + betFraction) * user.points)
            client.say(target, `@${username} Herzlichen Glückwunsch! Du hast jetzt ${formatPoints(user.points)}. Versuch es doch gleich nochmal! leeachLove`)
          } else {
            user.points = Math.floor((1 - betFraction) * user.points)
            client.say(target, `@${username} Oh Nein, du hast leider verloren! Du hast jetzt ${formatPoints(user.points)}. Versuch es doch gleich nochmal! 🤭`)
          }
          user.save().then(() => {})
        }
      })
}

const rouletteColor = number => {
  const index = roulette.roulette.findIndex(n => n === number)
  if (index === 0) {
    return 'green'
  }
  if (index % 2 === 0) {
    return 'black'
  }
  return 'red'
}

const rouletteColorBet = (client, target, userId, username, points, bet) => {
  User.findOne({userId})
    .exec((err, user) => {
      if (user) {
        if (points > user.points) {
          client.say(target, `@${username} Du besitzt leider nicht genug ${conf.currency.namePlural}.`)
        } else {
          const rouletteResult = Math.floor(37 * Math.random())
          const color = rouletteColor(rouletteResult);
          const won = bet === color
          let msg = `@${username} Es ist eine ${rouletteResult} (${translations[color]}). `
          if (won) {
            user.points += points
            msg += `Du hast also gewonnen! Du besitzt jetzt ${formatPoints(user.points)}. leeachLove`
          } else {
            user.points -= points
            msg += `Du hast leider verloren! Du besitzt jetzt ${formatPoints(user.points)}.`
          }
          user.save().then(() => {})
          client.say(target, msg)
        }
      }
    })
}

const rouletteNumber = (client, target, userId, username, points, bet) => {
  User.findOne({userId})
    .exec((err, user) => {
      if (user) {
        if (points > user.points) {
          client.say(target, `@${username} Du besitzt leider nicht genug ${conf.currency.namePlural}.`)
        } else {
          const rouletteResult = Math.floor(37 * Math.random())
          const color = rouletteColor(rouletteResult);
          const won = bet === rouletteResult
          let msg = `@${username} Es ist eine ${rouletteResult} (${translations[color]}). `
          if (won) {
            user.points += 35 * points
            msg += `Du hast also gewonnen! Du besitzt jetzt ${formatPoints(user.points)}. leeachLove`
          } else {
            user.points -= points
            msg += `Du hast leider verloren! Du besitzt jetzt ${formatPoints(user.points)}.`
          }
          user.save().then(() => {})
          client.say(target, msg)
        }
      }
    })
}

function bitsLeaderboardMessagePart(i, res) {
  return `${i + 1}. ${res.data.data[i]['user_name']} ${res.data.data[i].score} Bits `
}

const bitsLeaderboard = (client, target, userId, username) => {
  Security.findOne({})
    .exec((err, security) => {
      axios.get('https://api.twitch.tv/helix/bits/leaderboard', {
        headers: {
          Authorization: `Bearer ${security.accessToken}`
        }
      })
        .then(res => {
          if (res.status === 401) {
            global.refreshToken().then(() => bitsLeaderboard(client, target, userId, username))
          }
          if (res.data && res.data.data) {
            let msg = `${username} `
            for (let i = 0; i < Math.min(3, res.data.data.length); i++) {
              msg += bitsLeaderboardMessagePart(i, res)
            }
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i]['user_id'] === userId) {
                if (i > 2) {
                  msg += bitsLeaderboardMessagePart(i, res)
                }
                break
              }
            }
            client.say(target, msg)
          }
        })
        .catch(err => global.refreshToken().then(() => bitsLeaderboard(client, target, userId, username)))
    })
}

const formatPoints = points => `${points} ${points === 1 ? conf.currency.nameSingular : conf.currency.namePlural}`

function handleCommand(client, target, context, cmd) {
  if (cmd.startsWith('!gamble')) {
    const percentage = parseInt(cmd.substr(7, cmd.length).trim())
    if (percentage > 0 && percentage <= 100) {
      gamble(client, target, context['user-id'], context.username, percentage / 100)
    } else if (cmd.substr(7, cmd.length).trim() === 'all') {
      gamble(client, target, context['user-id'], context.username, 1)
    } else {
      client.say(target, `@${context.username} !gamble <1-100>`)
    }
  } else if (cmd.startsWith('!roulette')) {
    const parts = cmd.split(/\s+/)
    if (parts.length === 3) {
      const points = parseInt(parts[1])
      const bet = parts[2];
      if (points) {
        if (['green', 'black', 'red'].includes(bet)) {
          rouletteColorBet(client, target, context['user-id'], context.username, points, bet)
        } else {
          const betAsNumber = parseInt(bet)
          if (betAsNumber >= 0 && betAsNumber <= 36) {
            rouletteNumber(client, target, context['user-id'], context.username, points, betAsNumber)
          } else {
            client.say(target, `@${context.username} !roulette <${conf.currency.namePlural}> <0-36 oder Farbe>`)
          }
        }
      }
    } else {
      client.say(target, `@${context.username} !roulette <${conf.currency.namePlural}> <0-36 oder Farbe>`)
    }
  } else {
    switch (cmd) {
      case '!p':
        dangos(client, target, context['user-id'], context.username)
        break
      case '!dangos':
        dangos(client, target, context['user-id'], context.username)
        break
      case '!leaderboard':
        leaderboard(client, target, context['user-id'], context.username)
        break
      case '!rekord':
        leaderboard(client, target, context['user-id'], context.username)
        break
      case '!epic':
        client.say(target, `@${context.username} Genauso wie auf Twitch: LeeaChaan`)
        break
      case '!bits':
        bitsLeaderboard(client, target, context['user-id'], context.username)
        break
      case '!h':
        help(client, target, context.username)
        break
      case '!help':
        help(client, target, context.username)
        break
    }
  }
}

module.exports = {handleCommand}
