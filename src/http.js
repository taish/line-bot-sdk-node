let LineBot = require('./line-bot')

class Http {
  /**
   * Request
   * @param   {String}  method
   * @param   {String}  url
   * @param   {Object}  [data]
   * @param   {String}  headers
   * @return  {Promise}
   */
  static request (method, url, headers, data) {
    const rp = require('request-promise')
    const options = {
      method: method,
      uri: url,
      json: true,
      headers: Object.assign({ 'User-Agent': 'Line-Bot-Node-SDK/' + LineBot.VERSION }, headers)
    }
    if (data) {
      options.body = data
    }
    return rp(options).catch((response) => {
      response = {
        body: response.error ? response.error : response,
        status: response.statusCode
      }
      throw response
    })
  }
}

module.exports = Http
