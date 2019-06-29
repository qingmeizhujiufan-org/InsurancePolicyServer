'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class UserService extends Service {

    async login(params) {
        const ctx = this.ctx;
        const User = ctx.model.User;
        const File = ctx.model.File;
        User.belongsTo(File, {foreignKey: 'avatarSrc'});
        const res = await ctx.model.Admin.findOne({
            where: params,
            include: [{
                model: File,
                attributes: ['id', 'fileType']
            }],
        });
        return res;
    }

    async queryList(params) {
        const ctx = this.ctx;
        const User = ctx.model.User;
        const {pageNumber = 1, pageSize = 10, keyWords = ''} = params;
        const whereCondition = {
            // '$or': {
            //     realName: {
            //         '$like': '%' + keyWords + '%'
            //     },
            //     userName: {
            //         '$like': '%' + keyWords + '%'
            //     }
            // }
        };

        const dataList = await Promise.all([
            User.findAll({
                where: whereCondition,
            }),
            User.findAll({
                where: whereCondition,
                order: [
                    ['created_at', 'DESC']
                ],
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
            })
        ]);

        return {
            content: dataList[1],
            pageNumber,
            pageSize,
            totalElements: dataList[0].length
        };
    }

    async add(params) {
       
        const res = await this.ctx.model.User.create(params);
        return res;
    }

    async update(params) {
        const res = await this.ctx.model.User.update(params, {
            where: {id: params.id}
        });
        return res;
    }

    async queryOneUser(params) {
        const res = await this.ctx.model.User.findOne({
            where: {
                ...params
            }
        });
        return res;
    }


    async delete(params) {
        const res = await this.ctx.model.User.destroy({
            where: {id: params.id}
        });
        return res;
    }

    async findByName(params) {
        const user = await this.ctx.model.User.findOne({
            where: params
        });
        return user;
    }

     async findByPhone(params) {
        const user = await this.ctx.model.User.findOne({
            where: params
        });
        return user;
    }

    async checkOldPassword(params) {
        const user = await this.ctx.model.User.findOne({
            where: params
        });
        return user;

    }

    async resetPassword(params) {
        const newData = {
            ...params,
            password: '000000',
        }
        const res = await this.ctx.model.User.update(newData, {
            where: {id: params.id}
        });
        return res;
    }

     async changePassword(params) {
        const newData = {
            id: params.id,
            password:  params,nesPassword,
        }
        const res = await this.ctx.model.User.update(newData, {
            where: {id: params.id}
        });
        return res;
    }

    async frozen(params) {
        const newData = {
            ...params
        }
        const res = await this.ctx.model.User.update(newData, {
            where: {id: params.id}
        });
        return res;
    }
}

module.exports = UserService;
