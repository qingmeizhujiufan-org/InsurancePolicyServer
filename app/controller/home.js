'use strict';
const TopClient = require('../extend/sdk-nodejs-26060229/lib/api/topClient').TopClient;
const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';

        var client = new TopClient({
            'appkey': '26060229',
            'appsecret': '8b951b83a456081b2d4aff1e49c7f5c6',
            'REST_URL': 'http://gw.api.taobao.com/router/rest'
        });

        client.execute('taobao.tbk.tpwd.create', {
            'user_id':'123',
            'text':'长度大于5个字符',
            'url':'https://item.taobao.com/item.htm?id=526257147865&spm=a21bo.7925826.192013.4.6d074c0dN8hUn4&track_params=%7B%22jpFeedId%22%3A%222200000200248760677%22%7D&scm=1007.12846.65991.-1&pvid=e9cae963-3b1b-45d7-acdb-02c1ef8d1887',
            'logo':'https://uland.taobao.com/',
            'ext':'{}'
        }, function(error, response) {
            if (!error) {
                console.log('response == ', response);
            } else {
                console.log(error);
            }
        })
    }
}

module.exports = HomeController;
