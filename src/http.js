const LineBot = require('./line-bot')
const rp = require('request-promise')

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
    let options = {
      method: method,
      uri: url,
      json: true,
      headers: headers
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
