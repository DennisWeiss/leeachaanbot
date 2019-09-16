const global = require('./global')
const User = require('./model/User')
const conf = require('./conf/conf')


function help(client, target, username) {
  client.say(target, `@${username} Verfügbare Kommandos: !p, !dangos: Sagt dir wieviele 
  ${conf.currency.namePlural} du besitzt. !leaderboard, !rekord: Schau wer die meisten ${conf.currency.namePlural} besitzt. 
  !gamble <1-100> Gib an wie viel % deiner ${conf.currency.namePlural} du mit einer 50/50 Chance vergamblen möchtest.`)
}

function dangos(client, target, userId, username) {
	console.log(userId)
  User.findOne({userId})
    .exec(function (err, user) {
		console.log(user)
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
  } else  {
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
