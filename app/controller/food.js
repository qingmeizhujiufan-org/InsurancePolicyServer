'use strict';
const BaseController = require('../core/BaseController');

class HomeController extends BaseController {
    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        if (params.state) params.state = ctx.helper.parseInt(params.state);
        const result = await ctx.service.food.queryList(params);
        if (result) {

            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async queryAdminList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.food.queryAdminList(params);
        if (result) {

            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async queryListByShopId() {
        const ctx = this.ctx;
        const params = ctx.query;
        console.log('params ===', params);
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.food.queryListByShopId(params);
        if (result) {
            let content = result.content;
            for (let i in content) {
                const headerPicList = await ctx.service.attachment.queryListByIds(content[i].headerPic);
                content[i].headerPic = headerPicList[0];
            }
            result.content = content;
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    /* 获取最新三条食品信息 */
    async queryListTop3() {
        const ctx = this.ctx;
        const result = await ctx.service.food.queryListTop3();
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
        const result = await ctx.service.food.queryDetail(params);

        if (result) {
            const headerPicList = await ctx.service.attachment.queryListByIds(result.headerPic);
            const detailPicList = await ctx.service.attachment.queryListByIds(result.detailPic);
            result.headerPic = headerPicList;
            result.detailPic = detailPicList;

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
        fieldsValue.state = 0;
        const result = await ctx.service.food.add(fieldsValue);

        if (result.rowsAffected) {
            try {
                /* 广播新增产品消息给管理员及时审核 */
                const {app} = this;
                const nsp = app.io.of('/');

                try {
                    nsp.emit('review_food', '有新产品等待审核，请及时处理');
                } catch (error) {
                    app.logger.error(error);
                }
            } catch (e) {

            }

            this.success({
                backData: result,
                backMsg: "新增产品成功！"
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
        const result = await ctx.service.food.update(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "修改产品信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改产品信息失败！"
            });
        }
    }

    async check() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.food.check(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "食品信息审核成功！"
            });
        } else {
            this.fail({
                backMsg: "食品信息审核失败！"
            });
        }
    }

    async delete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.food.delete(params);

        if (result) {
            this.success({
                backMsg: "删除产品信息成功！"
            });
        } else {
            this.fail({
                backMsg: "删除产品信息失败！"
            });
        }
    }

    //查询所有产品
    async queryAllCategoryList() {
        const ctx = this.ctx;
        const result = await ctx.service.food.queryAllCategoryList();
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    //产品分类列表
    async queryCategoryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = parseInt(params.pageNumber);
        params.pageSize = parseInt(params.pageSize);
        const result = await ctx.service.food.queryCategoryList(params);
        if (result) {
            for (let item of result.content) {
                const pic = await ctx.service.attachment.queryListByIds(item.foodCategoryPic);
                item.foodCategoryPic = pic;
            }

            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    //产品分类新增
    async categoryAdd() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.food.categoryAdd(params);
        if (result[1]) {
            this.success({
                backData: result,
                backMsg: "新增产品类别成功！"
            });
        } else {
            this.fail({
                backMsg: "新增产品类别失败,当前分类已存在！"
            });
        }
    }

    //产品分类详情
    async categoryDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.food.categoryDetail(params);

        if (result) {
            const foodCategoryPic = await ctx.service.attachment.queryListByIds(result.foodCategoryPic);
            result.foodCategoryPic = foodCategoryPic;

            this.success({
                backData: result,
                backMsg: '查询成功！'
            });
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    //产品分类更新
    async categoryUpdate() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.food.categoryUpdate(fieldsValue);

        if (result) {
            this.success({
                backData: result,
                backMsg: "修改分类信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改分类信息失败！"
            });
        }
    }

    //产品分类删除
    async categoryDelete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        console.log('params ===', params);
        const food = await ctx.service.food.findFoodByCategoryId(params);
        console.log(food)
        if (food.length > 0) {
            this.fail({
                backMsg: "当前分类不可删除，请确保此分类下没有关联食品！"
            });
        } else {
            const result = await ctx.service.food.categoryDelete(params);
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

    /* 推荐 */
    async recommend() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = ctx.model.Food.update({
            isRecommend: fieldsValue.isRecommend
        }, {where: {id: fieldsValue.id}});
        if (result) {
            this.success({
                backData: result,
                backMsg: "更新成功！"
            })
        } else {
            this.fail({backMsg: "更新失败！"});
        }
    }
}

module.exports = HomeController;
