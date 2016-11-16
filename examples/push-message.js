const LineBot = require("../src/line-bot")

let client = new LineBot({
  channelToken: '<insert client token>',
  channelSecret: '<insert client secret>'
})

lat message = {
  type: 'text',
  text: 'hello'
}

// pushMessage api

client.pushMessage("<to>", message)
  .then((response) => {
    console.log(response)
  })
  .catch((response) => {
    console.log(response.body)
    console.log(response.status)
  })

lat messages = [
      {
          "type":"text",
          "text":"Hello, world1"
      },
      {
          "type":"text",
          "text":"Hello, world2"
      }
  ]

// and could send array of message
client.pushMessage("<to>", messages)
