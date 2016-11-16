import test from 'ava'
import sinon from 'sinon'
import LineBot from '../src/line-bot'
import Http from '../src/http'

const profileContent = {
  "displayName": "LINE taro",
  "userId":"Uxxxxxxxxxxxxxx...",
  "pictureUrl":"http://obs.line-apps.com/...",
  "statusMessage":"Hello, LINE!"
}

test('get user profile ', async t => {
  sinon.stub(Http, 'request', function (method, url, headers, data) {
    t.is(method, 'GET')
    t.is(url, 'https://api.line.me/v2/bot/profile/<to>')
    t.deepEqual(data, undefined)
    return Promise.resolve({body: profileContent, status: 200})
  })

  const client = new LineBot({
    channelToken: '<insert client token>',
    channelSecret: '<insert client secret>'
  })
  const response = await client.getProfile('<to>')
  const profile = response.body
  t.is(profile.displayName, "LINE taro")
  t.is(profile.userId, "Uxxxxxxxxxxxxxx...")
  t.is(profile.pictureUrl, "http://obs.line-apps.com/...")
  t.is(profile.statusMessage, "Hello, LINE!")
  t.not(response, null)
})
