const Request = require('./request')
const Crypto = require('crypto')

class LineBot {

  constructor(credentials) {
    this._credentials = credentials
    if (!this._credentials) {
      throw new Error("InvalidCredentialsError")
    }
  }

  _getCredential(credentialKey) {
    return this._credentials[credentialKey]
  }

  getChannelToken() {
    return this._getCredential('channelToken')
  }

  getChannelSecret() {
    return this._getCredential('channelSecret')
  }

  validateSignature(content, channelSignature) {
    if (!channelSignature || !this.getChannelSecret()) {
      return false
    }
    const hmac = Crypto.createHmac('sha256', this.getChannelSecret())
    hmac.update(content)
    return hmac.digest('base64') === channelSignature
  }

  replyMessage(replyToken, messages) {
    const data = {
      "replyToken": replyToken,
      "messages": Array.isArray(messages) ? messages : [messages]
    }
    const request = new Request('/v2/bot/message/reply', this.getChannelToken(), data)
    return request.post()
  }

  pushMessage(userId, messages) {
    const data = {
      "to": userId,
      "messages": Array.isArray(messages) ? messages : [messages]
    }
    const request = new Request('/v2/bot/message/push', this.getChannelToken(), data)
    return request.post()
  }

  getProfile(userId) {
    const path = '/v2/bot/profile/' + userId
    const request = new Request(path, this.getChannelToken())
    return request.get()
  }

  getContent(messageId) {
    const path = '/v2/bot/message/' + messageId + '/content'
    const request = new Request(path, this.getChannelToken())
    return request.get()
  }

  leaveRoom(roomId) {
    const path = '/v2/bot/room/' + roomId + '/leave'
    const request = new Request(path, this.getChannelToken())
    return request.post()
  }
}

module.exports = LineBot
