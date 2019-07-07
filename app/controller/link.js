'use strict';

const BaseController = require('../core/BaseController');
const {parseInt} = require('../extend/helper');

class LinkController extends BaseController {

    async queryDetail() {
        const ctx = this.ctx;
        const insuranceCompany = await ctx.service.link.queryDetail();
        this.success({
            backMsg: "获取保险公司列表成功！",
            backData: insuranceCompany
        });
    }

    async update() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.link.update(params);

        if (result) {
            this.success({
                backMsg: "信息修改成功",
            });
        } else {
            this.fail({
                backMsg: "信息修改失败！"
            });
        }
    }
}

module.exports = LinkController;
