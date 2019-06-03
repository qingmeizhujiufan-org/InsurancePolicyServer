'use strict';

const BaseController = require('../core/BaseController');

class ShopController extends BaseController {
    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = parseInt(params.pageNumber);
        params.pageSize = parseInt(params.pageSize);
        const result = await ctx.service.shop.queryList(params);
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async queryDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.shop.queryDetail(params);

        if (result) {
            const shopPic = await ctx.service.attachment.queryListByIds(result.shopPic);
            const shopCertificate = await ctx.service.attachment.queryListByIds(result.shopCertificate);

            result.shopPic = shopPic;
            result.shopCertificate = shopCertificate;


            this.success({
                backData: result,
                backMsg: '查询成功！'
            });
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async add() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.shop.add(fieldsValue);

        if (result[1]) {
            this.success({
                backData: result,
                backMsg: "新增店铺成功！"
            });
        } else {
            this.fail({
                backMsg: "新增失败！"
            });
        }
    }

    async update() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.shop.update(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "修改店铺信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改店铺信息失败！"
            });
        }
    }

    async delete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        console.log('params ===', params);
        const food = await ctx.service.food.findFoodByShopId(params);
        if (food.length) {
            this.fail({
                backMsg: "当前店铺不可删除，请确保此商铺没有关联食品！"
            });
        } else {
            const result = await ctx.service.shop.delete(params);
            console.log('result ===', result)
            if (result) {
                this.success({
                    backMsg: "店铺删除成功",
                });
            } else {
                this.fail({
                    backMsg: "店铺删除失败！"
                });
            }
        }
    }
}

module.exports = ShopController;
