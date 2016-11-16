import test from 'ava'
import LineBot from '../../src/line-bot'

const content = '{"events":[{"replyToken":"XdpvsbHiFGdeT3hB1Z3sKdP1mqCOUi","type":"message","timestamp":1451617200000,"source":{"type":"user","userId":"Udeadbeefdeadbeefdeadbeefdeadbeef"},"message":{"id":"100001","type":"text","text":"Hello,world"}},{"replyToken":"wCY4r8aRoVKpQkYqak03S4r2uRslQ3","type":"message","timestamp":1451617210000,"source":{"type":"user","userId":"Udeadbeefdeadbeefdeadbeefdeadbeef"},"message":{"id":"100002","type":"sticker","packageId":"1","stickerId":"1"}}]}'

test('validates signature to success', t => {
  const client = new LineBot({
    channelToken: '<insert client token>',
    channelSecret: '126fc61adf4c3ae1ac04909968ae5da2'
  })
  t.true(client.validateSignature(content, 'EYET9ritXNmIm9lc74a6T7owDkRLwLg83X0z8TZwpgM='))
})

test('validates signature to failure', t => {
  const client = new LineBot({
    channelToken: '<insert client token>',
    channelSecret: '126fc61adf4c3ae1ac04909968ae5da2'
  })
  t.false(client.validateSignature(content, 'invalid'))
})
