const global = require('./global')


function handleCommand(client, target, context, cmd) {
    switch (cmd) {
        case '!p':
            client.say(target, 'You got 0 points.');
            break;
    }
}

module.exports = {handleCommand};
