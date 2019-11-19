const global = require('./global')
const User = require('./model/User')
const Security = require('./model/Security')
const Command = require('./model/CustomCommand')
const conf = require('./conf/conf')
const roulette = require('./model/roulette')
const translations = require('./conf/translations')
const numeral = require('numeral')
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

const leaderboardMessagePart = (index, displayName, points) => `${index + 1}. ${displayName} ${formatPoints(points)} - `

const leaderboardMessage = (sortedUsers, userId, top = 3, index = 0, userAppeared = false) => new Promise(resolve => {
  if (index >= sortedUsers.length) {
    resolve('')
  } else if (top === 0) {
    if (userAppeared) {
      resolve('')
    } else if (sortedUsers[index].userId === userId) {
      axios.get(`https://api.twitch.tv/helix/users?id=${sortedUsers[index].userId}`, {
        headers: {
          'Client-ID': conf.clientId
        }
      }).then(res => {
        const messagePart = leaderboardMessagePart(
          index,
          res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].display_name : '*',
          sortedUsers[index].points
        )
        resolve(messagePart.substr(0, messagePart.length - 3))}
      )
    } else {
      leaderboardMessage(sortedUsers, userId, top, index + 1, userAppeared).then(resolve)
    }
  } else {
    axios.get(`https://api.twitch.tv/helix/users?id=${sortedUsers[index].userId}`, {
      headers: {
        'Client-ID': conf.clientId
      }
    }).then(res => {
      const messagePart = leaderboardMessagePart(
        index,
        res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].display_name : '*',
        sortedUsers[index].points
      )
      leaderboardMessage(sortedUsers, userId, top - 1, index + 1,
        userAppeared || sortedUsers[index].userId === userId)
        .then(msg => resolve(
          messagePart.substr(0, messagePart.length - (userAppeared && top === 1 ? 3 : 0)) + msg
        ))
    })
  }
})

function leaderboard(client, target, userId, username) {
  User.find({})
    .exec((err, users) => {
      const sortedUsers = [...users].sort((a, b) => b.points - a.points)
      let msg = `@${username} `
      leaderboardMessage(sortedUsers, userId)
        .then(msg => client.say(target, `@${username} ${msg}`))
    })
}

const gamble = (client, target, userId, username, betFraction) => {
  User.findOne({userId})
    .exec((err, user) => {
      if (user) {
        if (Math.random() >= 0.5) {
          user.points = Math.floor((1 + betFraction) * user.points)
          client.say(target, `@${username} Herzlichen Glückwunsch! Du hast jetzt ${formatPoints(user.points)}. Versuch es doch gleich nochmal! leeachLove`)
        } else {
          user.points = Math.floor((1 - betFraction) * user.points)
          client.say(target, `@${username} Oh Nein, du hast leider verloren! Du hast jetzt ${formatPoints(user.points)}. Versuch es doch gleich nochmal! 🤭`)
        }
        user.save().then(() => {
        })
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
          const color = rouletteColor(rouletteResult)
          const won = bet === color
          let msg = `@${username} Es ist eine ${rouletteResult} (${translations[color]}). `
          if (won) {
            user.points += points
            msg += `Du hast also gewonnen! Du besitzt jetzt ${formatPoints(user.points)}. leeachLove`
          } else {
            user.points -= points
            msg += `Du hast leider verloren! Du besitzt jetzt ${formatPoints(user.points)}.`
          }
          user.save().then(() => {
          })
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
          const color = rouletteColor(rouletteResult)
          const won = bet === rouletteResult
          let msg = `@${username} Es ist eine ${rouletteResult} (${translations[color]}). `
          if (won) {
            user.points += 35 * points
            msg += `Du hast also gewonnen! Du besitzt jetzt ${formatPoints(user.points)}. leeachLove`
          } else {
            user.points -= points
            msg += `Du hast leider verloren! Du besitzt jetzt ${formatPoints(user.points)}.`
          }
          user.save().then(() => {
          })
          client.say(target, msg)
        }
      }
    })
}

function bitsLeaderboardMessagePart(i, res) {
  return `${i + 1}. ${res.data.data[i]['user_name']} ${res.data.data[i].score} Bits - `
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
            client.say(target, msg.substr(0, msg.length - 3))
          }
        })
        .catch(err => global.refreshToken().then(() => bitsLeaderboard(client, target, userId, username)))
    })
}

const donationLeaderboard = (client, target, username) => {
  axios.get(`https://www.tipeeestream.com/v2.0/users/${conf.broadcasterChannelName}/leaderboard?start=1970-01-01`)
    .then(res => {
      if (res.data && res.data.datas && res.data.datas.result) {
        let msg = `@${username} `
        for (let i = 0; i < 5; i++) {
          const resultElement = res.data.datas.result[i.toString()]
          if (resultElement) {
            msg += `${i + 1}. ${resultElement.username} ${resultElement.amount} ${conf.donationCurrency} - `
          }
        }
        client.say(target, msg.substr(0, msg.length - 3))
      }
    })
}

const give = (client, target, userId, username, usernameToGive, pointsToGive) => {
  if (username.toLowerCase() === usernameToGive.toLowerCase()) {
    client.say(target, `@${username} Du kannst dir doch nicht selber ${conf.currency.namePlural} geben. 🤭`)
  } else {
    User.findOne({userId})
      .exec((err, user) => {
        if (user) {
          if (pointsToGive > user.points) {
            client.say(target, `@${username} Du hast leider nicht genug ${conf.currency.namePlural}.`)
          } else {
            User.findOne({name: usernameToGive.toLowerCase()})
              .exec((err, userToGive) => {
                if (userToGive) {
                  user.points -= pointsToGive
                  userToGive.points += pointsToGive
                  user.save().then(() => {
                  })
                  userToGive.save().then(() => {
                  })
                  client.say(target, `@${username} hat @${usernameToGive} ${formatPoints(pointsToGive)} gegeben.`)
                } else {
                  client.say(target, `@${username} Ich konnte ${usernameToGive} leider nicht finden.`)
                }
              })
          }
        }
      })
  }
}

const formatPoints = points => `${numeral(points).format('0,0')} ${points === 1 ? conf.currency.nameSingular : conf.currency.namePlural}`

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
      const bet = parts[2]
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
  } else if (cmd.startsWith('!give')) {
    const parts = cmd.split(/\s+/)
    if (parts.length !== 3) {
      client.say(target, `@${context.username} !give <Username> <${conf.currency.namePlural}>`)
    } else {
      const usernameToGive = parts[1]
      const pointsToGive = parseInt(parts[2])
      if (usernameToGive && pointsToGive && pointsToGive > 0) {
        give(client, target, context['user-id'], context.username, usernameToGive, pointsToGive)
      } else {
        client.say(target, `@${context.username} !give <Username> <${conf.currency.namePlural}>`)
      }
    }
  } else {
    Command.find({})
      .exec((err, commands) => {
        commands.forEach(command => {
          command.commandHandles.forEach(commandHandle => {
            if (cmd === `!${commandHandle}`) {
              client.say(target, (command.showTwitchHandle ? `@${context.username} ` : '') + command.response)
            }
          })
        })
      })

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
      case '!bits':
        bitsLeaderboard(client, target, context['user-id'], context.username)
        break
      case '!donations':
        donationLeaderboard(client, target, context.username)
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
