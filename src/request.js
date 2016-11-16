const Http = require('./http')
const Api = require('./api')

class Request {

  constructor(path, headerToken, data) {
    this.url = Api.HOST + path
    this.headers = {
      'Authorization': 'Bearer ' + headerToken,
      'User-Agent': 'Line-Bot-Node-SDK/' + Api.VERSION
    }
    this.params = data
  }

  get () {
    return Http.request('GET', this.url, this.headers)
  }

  post () {
    return Http.request('POST', this.url, this.headers, this.params)
  }
}

module.exports = Request
