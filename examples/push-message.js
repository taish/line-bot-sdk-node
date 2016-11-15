let LineBot = require("../src/line-bot")

let client = new LineBot({
  channelToken: '<insert client token>',
  channelSecret: '<insert client secret>'
})

lat message = {
  type: 'text',
  text: 'hello'
}

client.pushMessage("<to>", message)
