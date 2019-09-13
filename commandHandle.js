const global = require('./global')
const User = require('./model/User')


function handleCommand(client, target, context, cmd) {
    switch (cmd) {
        case '!p':
            User.findOne({name: context.username})
                .exec(function (err, user) {
					const points = user ? user.points : 0
                    client.say(target, `@${context.username} Du hast ${points} %{points == 1 ? 'Dango' : 'Dangos'}.`)
                })
            break;
    }
}

module.exports = {handleCommand};
