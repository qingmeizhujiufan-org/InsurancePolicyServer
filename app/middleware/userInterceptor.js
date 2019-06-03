'use strict';

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
    return async function userInterceptor(ctx, next) {
        //获取token
        let token = ctx.cookies.get('token');
        //验证token是否为空
        if (token) {
            let result = verifyToken(token) //解密token
            console.log('result == ', result);
            let {_id} = result //检查是否有用户_id
            //验证客户端token是否合法
            if (_id) {
                let redis_token = await app.redis.get('username') // 获取redis中的token
                //验证是否为最新的token
                if (token === redis_token) {
                    await next();
                } else {
                    // 如果不是最新token，则代表用户在另一个机器上进行操作，需要用户重新登录保存最新token
                    ctx.body = {
                        status: 401,
                        message: '您的账号已在其他机器保持登录，如果继续将清除其他机器的登录状态'
                    }
                    ctx.status = 401;
                }
            } else {
                // 如果token不合法，则代表客户端token已经过期或者不合法（伪造token）
                ctx.body = {
                    status: 401,
                    message: '您的登录状态已过期，请重新登录'
                };
                ctx.status = 401;
            }
        } else {
            // 如果token为空，则代表客户没有登录
            ctx.body = {
                status: 401,
                message: '您还没有登录，请登录后再进行操作'
            };
            ctx.status = 401;
        }
    };
}

// 验证token的方法，传入token，解密，验证是否过期
function verifyToken(token) {
    // let cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem'));//公钥
    let res = '';
    try {
        let result = jwt.verify(token, 'shhhhh') || {};
        let {exp, iat} = result, current = Date.now();
        if (current <= exp) {
            res = result.data || {};
        }
    } catch (e) {
        console.log(e);
    }
    return res;
}
