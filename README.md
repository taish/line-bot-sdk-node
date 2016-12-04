# line-bot-sdk-node

[![Build Status](https://travis-ci.org/taish/line-bot-sdk-node.svg?branch=master)](https://travis-ci.org/taish/line-bot-sdk-node)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## About the LINE Messaging API

See the official API reference documentation for more information.

https://devdocs.line.me/

Usage:

```js
const LineBot = require("line-bot-api")

const client = new LineBot({
  channelToken: '<insert client token>',
  channelSecret: '<insert client secret>'
})

// Using Express
app.post('/', bodyParser.json({ verify: (req, res, buf) => req.rawBody = buf }), (req, res) => {

  if (!client.validateSignature(req.rawBody, req.headers['x-line-signature'])) {
    res.sendStatus(400)
    return
  }

  // Retrieve the request's body and parse it as JSON
  const eventJson = JSON.parse(req.rawBody)
  eventJson.events.forEach(event => {
    switch (event.type) {
    case 'message':
      switch (event.message.type) {
      case 'text':
        const message = {
          type: 'text',
          text: event.message.text
        }
        client.replyMessage(event.replyToken, message)
          .then((response) => {
            console.log(response)
          })
          .catch((response) => {
            console.log(response.body)
            console.log(response.status)
          })
        break
      }
      break
    }
  })
  res.sendStatus(200)
})

// Send message or messages to user
const message = {
  type: 'text',
  text: 'hello'
}
const messages = [
  {
      "type":"text",
      "text":"Hello, world1"
  },
  {
      "type":"text",
      "text":"Hello, world2"
  }
]
client.pushMessage("<to>", message)
  .then((response) => {
    console.log(response)
  })
  .catch((response) => {
    console.log(response.body)
    console.log(response.status)
  })
```


## docs

https://taish.github.io/line-bot-sdk-node/LineBot.html
