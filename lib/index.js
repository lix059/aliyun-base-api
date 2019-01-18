const crypto = require('crypto');
const request = require('request');

class Base {
  constructor ({accessKeyId = '', accessKeySecret = '', endpoint = '', version = '', }) {
    this.accessKeyId = accessKeyId;
    this.accessKeySecret = accessKeySecret;
    this.endpoint = endpoint;
    this.Version = version;
  }

  requestApi(args) {
    let params = {
      Version: this.Version,
      Format: 'JSON',
      SignatureMethod: 'HMAC-SHA1',
      SignatureNonce: this.getRandomStr(25),
      SignatureVersion: '1.0',
      AccessKeyId: this.accessKeyId,
      Timestamp: new Date().toISOString()
    }
    Object.assign(params, args)
    params.Signature = this.getSignature(params)
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: this.endpoint,
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: params
      }, (error, response, body) => {
        if (response.statusCode === 201 || response.statusCode === 200) {
          resolve(body)
        } else {
          reject(body, error)
        }
      })
    })
  }

  getRandomStr (length) {
    return Array.from({ length }).map((value) => {
      return Math.floor(Math.random() * 10);
    }).join('');
  }

  getSignature (params) {
    let paramsStr = this.getQueryString(params);
    let signTemp = `POST&${encodeURIComponent('/')}&${encodeURIComponent(paramsStr)}`;
    let signature = crypto.createHmac('sha1', `${this.accessKeySecret}&`).update(signTemp).digest('base64');
    return signature;
  }

  getQueryString (params) {
    return Object.keys(params).sort().map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    }).join('&');
  }
}

module.exports = Base;
