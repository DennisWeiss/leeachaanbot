const global = require('./global')
const User = require('./model/User')


function handleCommand(client, target, context, cmd) {
    switch (cmd) {
        case '!p':
            User.findOne({name: target.substr(1, client.length)})
                .exec(function (err, user) {
                    client.say(target, `You got ${user ? user.points : 0} points.`)
                })
            break;
    }
}

module.exports = {handleCommand};
