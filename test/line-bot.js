import test from 'ava'
import sinon from 'sinon'
import LineBot from '../src/line-bot'
import Http from '../src/http'

test('pushMessage', async t => {
  let obj = {}
  let message = {
    type: 'text',
    text: 'hello'
  }
  sinon.stub(Http, 'request', function (method, url, headers, data) {
    t.is(method, 'POST')
    t.is(url, 'https://api.line.me/v2/bot/message/push')
    return Promise.resolve(obj)
  })
  let client = new LineBot({
    channelToken: '<insert client token>',
    channelSecret: '<insert client secret>'
  })
  let response = await client.pushMessage('<to>', message)
  t.is(response, obj)
})
