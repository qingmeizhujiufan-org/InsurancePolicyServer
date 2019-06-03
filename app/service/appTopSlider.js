'use strict';

const Service = require('egg').Service;

class RoleService extends Service {

    //获取app滚动图列表
    async queryList() {
        const ctx = this.ctx;
        const Attachment = ctx.model.Attachment;
        const AppTopSlider = ctx.model.AppTopSlider;
        AppTopSlider.belongsTo(Attachment, {foreignKey: 'imgId'});
        const topSliderList = await AppTopSlider.findAll({
            attributes: [
                'id',
                'foodLink',
                'desc',
                'no',
            ],
            include: [{
                model: Attachment,
                attributes: ['id', 'fileType']
            }],
            order: [
                ['created_at', 'DESC']
            ],
        });

        return topSliderList;
    }

    //查询详情
    async queryDetail(params) {
        const ctx = this.ctx;
        const {id} = params;
        const res = await ctx.model.AppTopSlider.findById(id);

        return res;
    }

    //增加app滚动图
    async add(fieldsValue) {
        const ctx = this.ctx;
        const row = {
            ...fieldsValue
        };
        const res = await ctx.model.AppTopSlider.create(row);

        return {
            rowsAffected: res,
        };
    }

    //修改app滚动图
    async update(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.AppTopSlider.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }

    //删除app滚动图
    async del(fieldsValue) {
        const ctx = this.ctx;
        const res = await ctx.model.AppTopSlider.destroy({where: {id: fieldsValue.id}});

        return {
            rowsAffected: res,
        };
    }

}

module.exports = RoleService;
