const global = require('./global')
const User = require('./model/User')
const conf = require('./conf/conf')


function help(client, target, username) {
  client.say(target, `@${username} Verfügbare Kommandos: !p, !dangos: Sagt dir wieviele 
  ${conf.currency.namePlural} du besitzt. !leaderboard: Schau wer die meisten ${conf.currency.namePlural} besitzt.`)
}

function dangos(client, target, username) {
  User.findOne({name: username})
    .exec(function (err, user) {
      const points = user ? user.points : 0
      client.say(target, `@${username} Du hast ${points} ${points === 1 ?
        conf.currency.nameSingular : conf.currency.namePlural}.`)
    })
}

function leaderboard(client, target, username) {
  User.find({})
    .exec((err, users) => {
      const sortedUsers = [...users].sort((a, b) => b.points - a.points)
      let msg = `@${username} `
      for (let i = 0; i < Math.min(3, sortedUsers.length); i++) {
        msg += `${i + 1}. ${sortedUsers[i].name} ${formatPoints(sortedUsers[i].points)} `
      }
      client.say(target, msg)
    })
}

const formatPoints = points => `${points} ${points === 1 ? conf.currency.nameSingular : conf.currency.namePlural}`

function handleCommand(client, target, context, cmd) {
  switch (cmd) {
    case '!p':
      dangos(client, target, context.username)
      break
    case '!dangos':
      dangos(client, target, context.username)
      break
    case '!leaderboard':
      leaderboard(client, target, context.username)
    case '!h':
      help(client, target, context.username)
      break
    case '!help':
      help(client, target, context.username)
      break
  }
}

module.exports = {handleCommand}
