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
  // Do something with eventJson
  res.sendStatus(200)
})

// Send message to user
const message = {
  type: 'text',
  text: 'hello'
}
client.pushMessage("<to>", message)
  .then((response) => {
    console.log(response)
  })
  .catch((response) => {
    console.log(response.body)
    console.log(response.status)
  })

// Send messages to user
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
client.pushMessage("<to>", messages)
```
