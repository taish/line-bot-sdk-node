import test from 'ava'
import sinon from 'sinon'
import Request from '../src/request'

test('header', async t => {
  let token = "client token"
  let url = "https://www.google.com"
  let request = new Request(url, token, {})
  t.is(request.headers['Authorization'], 'Bearer client token')
  t.is(request.headers['User-Agent'], 'Line-Bot-Node-SDK/v0.001')
})
