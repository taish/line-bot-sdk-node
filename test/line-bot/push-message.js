import test from 'ava'
import sinon from 'sinon'
import LineBot from '../../src/line-bot'
import Http from '../../src/http'

test.afterEach(t => {
    if (typeof Http.request.restore == 'function') {
      Http.request.restore()
    }
})

test.serial('pushes the text message', async t => {
  const obj = {}
  const message = {
    type: 'text',
    text: 'hello'
  }
  sinon.stub(Http, 'request', function (method, url, headers, data) {
    t.is(method, 'POST')
    t.is(url, 'https://api.line.me/v2/bot/message/push')
    t.deepEqual(data.messages, [message])
    return Promise.resolve({body: obj, status: 200})
  })
  const client = new LineBot({
    channelToken: '<insert client token>',
    channelSecret: '<insert client secret>'
  })
  const response = await client.pushMessage('<to>', message)
  t.is(response.body, obj)
})

test.serial('pushes two text messages', async t => {
  const obj = {}
  const messages = [
    {
      type: 'text',
      text: 'hello1'
    },
    {
      type: 'text',
      text: 'hello2'
    }
  ]
  sinon.stub(Http, 'request', function (method, url, headers, data) {
    t.is(method, 'POST')
    t.is(url, 'https://api.line.me/v2/bot/message/push')
    t.deepEqual(data.messages, messages)
    return Promise.resolve({body: obj, status: 200})
  })
  const client = new LineBot({
    channelToken: '<insert client token>',
    channelSecret: '<insert client secret>'
  })
  const response = await client.pushMessage('<to>', messages)
  t.is(response.body, obj)
})
