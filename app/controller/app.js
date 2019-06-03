'use strict';

const BaseController = require('../core/BaseController');
const Wechat = require('../extend/wechat');
const wechatConfig = {
    appId: 'wxdd6ab56296fa5c11',
    appSecret: '045e74a0b171791571694c6f6248cbfd'
};
const wechat = new Wechat(wechatConfig.appId, wechatConfig.appSecret);

class AppController extends BaseController {
    /* 微信授权登录 */
    async login() {
        const ctx = this.ctx;
        const code = ctx.query.code || '';
        if (!code) {
            this.fail({backMsg: "wechat code 获取失败"});
        } else {
            //获得userInfo
            let res = await wechat.getAccessToken(code);
            if(res) {
                let userInfo = await wechat.getUser(res.openid);

                if(userInfo) {
                    const result = await ctx.model.User.findOrCreate({
                        where: {openid: userInfo.openid},
                        defaults: {...userInfo}
                    });

                    if(result) {
                        this.success({
                            backMsg: "用户信息获取成功！",
                            backData: result
                        });
                    }else {
                        this.fail({backMsg: "系统繁忙，请稍候再试"});
                    }
                }else {
                    this.fail({backMsg: "wechat userinfo 获取失败"});
                }
            }else {
                this.fail({backMsg: "code 过期或者有误"});
            }
        }
    }

    async queryTopSliderList() {
        const ctx = this.ctx;
        const topSliderList = await ctx.service.appTopSlider.queryList();

        this.success({
            backMsg: "获取app滚动图列表成功！",
            backData: topSliderList
        });
    }

    async queryTopSliderDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.appTopSlider.queryDetail(params);

        if (result) {
            const imgId = await ctx.service.attachment.queryListByIds(result.imgId);
            result.imgId = imgId;

            this.success({
                backData: result,
                backMsg: '查询成功！'
            });
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async addTopSlider() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;

        const result = await ctx.service.appTopSlider.add(fieldsValue);
        if (result.rowsAffected) {
            this.success({
                backMsg: "新增APP滚动图成功！",
                backData: result
            });
        } else {
            this.fail({
                backMsg: "新增失败！"
            });
        }
    }

    async updateTopSlider() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.appTopSlider.update(fieldsValue);

        if (result.rowsAffected && result.rowsAffected[0] > 0) {
            this.success({
                backData: result,
                backMsg: "修改APP滚动图信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改APP滚动图信息失败！"
            });
        }
    }

    async delTopSlider() {
        const ctx = this.ctx;
        const params = ctx.request.body;

        const result = await ctx.service.appTopSlider.del(params);
        if (result.rowsAffected) {
            this.success({
                backMsg: "新增APP滚动图成功！",
                backData: result
            });
        } else {
            this.fail({
                backMsg: "新增失败！"
            });
        }
    }
}

module.exports = AppController;
