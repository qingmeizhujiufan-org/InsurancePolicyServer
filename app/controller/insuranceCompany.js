'use strict';

const BaseController = require('../core/BaseController');
const {parseInt} = require('../extend/helper');

class insuranceCompanyController extends BaseController {

    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = parseInt(params.pageNumber);
        params.pageSize = parseInt(params.pageSize);
        const insuranceCompany = await ctx.service.insuranceCompany.queryList(params);
        this.success({
            backMsg: "获取保险公司列表成功！",
            backData: insuranceCompany
        });
    }

    async queryDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        console.log('params ===', params);

        const result = await ctx.service.insuranceCompany.queryDetail(params);

        if (result) {
            this.success({
                backMsg: "保险公司详情查询成功！",
                backData: result
            });
        } else {
            this.fail({
                backMsg: "详情查询失败！",
            });
        }
    }

    async add() {
        const ctx = this.ctx;
        const params = ctx.request.body;

        const uniqueInsuranceCompany = await ctx.service.insuranceCompany.findByName({companyName: params.companyName});

        if (uniqueInsuranceCompany === null) {
            const result = await ctx.service.insuranceCompany.add(params);
            console.log('result === ', result);
            if (result.dataValues) {
                this.success({
                    backMsg: "新增保险公司成功！",
                    backData: result
                });
            } else {
                this.fail({
                    backMsg: "新增保险公司失败！"
                });
            }
        } else {
            this.fail({
                backMsg: "公司名已存在!"
            });
        }
    }

    async update() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.insuranceCompany.update(params);

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

    async delete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        console.log('params ===', params);

        const result = await ctx.service.insuranceCompany.delete(params);
        console.log('result ===', result)
        if (result) {
            this.success({
                backMsg: "删除成功",
            });
        } else {
            this.fail({
                backMsg: "删除失败！"
            });
        }
    }
}

module.exports = insuranceCompanyController;
