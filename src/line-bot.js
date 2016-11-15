let Http = require('./http')

class LineBot {
  static get VERSION () { return 'v0.0000001' }

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
  pushMessage(userId, messages) {
    let headers = {'Authorization': 'Bearer ' + this.getChannelToken()}
    let data = {
      "to": userId,
      "messages": messages
    }
    return Http.request('POST', 'https://api.line.me/v2/bot/message/push', data, headers)
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch((response) => {
      throw new Error(response)
    })
  }
}

module.exports = LineBot
