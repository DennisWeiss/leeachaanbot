const global = require('./global')
const User = require('./model/User')
const conf = require('./conf/conf')


function help(client, target, username) {
  client.say(target, `@${username} Verfügbare Kommandos:\n\n
  !p, !dangos    Sagt dir wieviele Dangos du besitzt.`)
}

function dangos(client, target, username) {
  User.findOne({name: username})
    .exec(function (err, user) {
      const points = user ? user.points : 0
      client.say(target, `@${username} Du hast ${points} ${points === 1 ?
        conf.currency.nameSingular : conf.currency.namePlural}.`)
    })
}

function handleCommand(client, target, context, cmd) {
  switch (cmd) {
    case '!p':
      dangos(client, target, context.username)
      break
    case '!dangos':
      dangos(client, target, context.username)
      break
    case '!h':
      help(client, target, context.username)
      break
    case '!help':
      help(client, target, context.username)
      break
  }
}

module.exports = {handleCommand}
