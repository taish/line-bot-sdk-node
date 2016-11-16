# line-bot-sdk-node

[![Build Status](https://travis-ci.org/taish/line-bot-sdk-node.svg?branch=master)](https://travis-ci.org/taish/line-bot-sdk-node)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## About the LINE Messaging API

See the official API reference documentation for more information.

https://devdocs.line.me/

Usage:

```
const LineBot = require("line-bot")

const client = new LineBot({
  channelToken: '<insert client token>',
  channelSecret: '<insert client secret>'
})

const message = {
  type: 'text',
  text: 'hello'
}

// Send message to user

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

// Send messages to user
client.pushMessage("<to>", messages)
```
