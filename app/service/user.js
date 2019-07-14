'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');
const Moment = require('moment');
const {getYearRange, getMonthRange, getQuarterRange} = require('../extend/util');

class UserService extends Service {

    async login(params) {
        const ctx = this.ctx;
        const User = ctx.model.User;
        const File = ctx.model.File;
        User.belongsTo(File, {foreignKey: 'headimgurl'});
        const res = await ctx.model.User.findOne({
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
            '$and': {
                telephone: {
                    '$like': '%' + keyWords + '%'
                },
                realname: {
                    '$like': '%' + keyWords + '%'
                }
            }
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

    async queryOneUser(params) {
        const Sequelize = this.app.Sequelize;
        const {User, File, InsuranceCompany} = this.ctx.model;
        User.belongsTo(File, {foreignKey: 'headimgurl'});

        User.belongsTo(InsuranceCompany, {foreignKey: 'company'});

        const res = await this.ctx.model.User.findOne({
            attributes: [
                'id',
                'realname',
                'bgId',
                'headimgurl',
                'company',
                'sex',
                'telephone',
                [Sequelize.col('InsuranceCompany.company_name'), 'companyName'],
                [Sequelize.col('File.file_type'), 'fileType']
            ],
            include: [{
                model: InsuranceCompany,
                attributes: []
            }, {
                model: File,
                attributes: []
            }],
            where: {
                id: params.id
            }
        });
        return res;
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

    async changePassword(params) {
        const {id, password} = params;
        const user = await this.ctx.model.User.update({password}, {
            where: {id}
        });
        return user;
    }

    async retrievePassword(params) {
        const {telephone, password} = params;
        const user = await this.ctx.model.User.update({password}, {
            where: {telephone}
        });
        return user;
    }

    async checkCode(params) {
        return true
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

    async frozen(params) {
        const newData = {
            ...params
        }
        const res = await this.ctx.model.User.update(newData, {
            where: {id: params.id}
        });
        return res;
    }

    async getCode(params) {
        // const res = await this.ctx.model.User.update(newData, {
        //   where: { id: params.id }
        // });
        return {
            code: '000000'
        };
    }

    async querySumOne(params) {
        const Sequelize = this.app.Sequelize;
        const Op = Sequelize.Op;
        const ctx = this.ctx;
        const {User, Order, File, InsuranceCompany, Thumbup} = ctx.model;

        User.belongsTo(InsuranceCompany, {foreignKey: 'company'});
        User.hasMany(Order, {foreignKey: 'userId'});
        User.hasMany(Thumbup, {foreignKey: 'thumbupId'});
        User.belongsTo(File, {foreignKey: 'headimgurl'});

        const {time = 0, condition = 0} = params;
        let range = {};
        let order = '';

        if (time === 0) {
            range = getMonthRange();
        }

        if (time === 1) {
            range = getQuarterRange();
        }

        if (time === 2) {
            range = getYearRange();
        }

        if (condition === 0) {
            order = Sequelize.fn('SUM', Sequelize.col('Orders.insurance'));
        }
        if (condition === 1) {
            order = Sequelize.fn('COUNT', Sequelize.col('Orders.id'));
        }

        const res = await User.findAll({
            attributes: [
                'id',
                'realname',
                'headimgurl',
                'bgId',
                'company',
                [Sequelize.col('File.file_type'), 'fileType'],
                [Sequelize.col('InsuranceCompany.company_name'), 'companyName'],
                [Sequelize.fn('SUM', Sequelize.col('Orders.insurance')), 'orderSum'],
                [Sequelize.fn('COUNT', Sequelize.col('Orders.id')), 'orderNum'],
                [Sequelize.fn('COUNT', Sequelize.col('Thumbups.thumbup_id')), 'thumbupNum']
            ],
            include: [{
                model: Order,
                attributes: [],
                where: {
                    created_at: {
                        [Op.between]: [range.beginDate, range.endDate]
                    },
                },
                required: false
            },
                {
                    model: InsuranceCompany,
                    attributes: []
                }, {
                    model: Thumbup,
                    attributes: []
                }, {
                    model: File,
                    attributes: []
                }
            ],
            group: 'id',
            order: [
                [order, 'DESC'],
                ['created_at', 'DESC']
            ],
            subQuery: false
        });

        return res;
    }


    async querySumList(params) {
        const Sequelize = this.app.Sequelize;
        const Op = Sequelize.Op;
        const ctx = this.ctx;
        const {User, File, Order, InsuranceCompany, Thumbup} = ctx.model;

        User.belongsTo(InsuranceCompany, {foreignKey: 'company'});
        User.hasMany(Order, {foreignKey: 'userId'});
        User.hasMany(Thumbup, {foreignKey: 'thumbupId'});
        User.belongsTo(File, {foreignKey: 'headimgurl'});

        const {pageNumber = 1, pageSize = 10, time = 0, condition = 0} = params;
        let range = {};
        let order = '';

        if (time === 0) {
            range = getMonthRange();
        }

        if (time === 1) {
            range = getQuarterRange();
        }

        if (time === 2) {
            range = getYearRange();
        }

        if (condition === 0) {
            order = Sequelize.fn('SUM', Sequelize.col('Orders.insurance'));
        }
        if (condition === 1) {
            order = Sequelize.fn('COUNT', Sequelize.col('Orders.id'));
        }

        const dataList = await Promise.all([
            User.findAll(),
            User.findAll({
                attributes: [
                    'id',
                    'realname',
                    'headimgurl',
                    'bgId',
                    [Sequelize.col('File.file_type'), 'fileType'],
                    [Sequelize.col('InsuranceCompany.company_name'), 'companyName'],
                    [Sequelize.fn('SUM', Sequelize.col('Orders.insurance')), 'orderSum'],
                    [Sequelize.fn('COUNT', Sequelize.col('Orders.id')), 'orderNum'],
                    [Sequelize.fn('COUNT', Sequelize.col('Thumbups.thumbup_id')), 'thumbupNum']
                ],
                include: [{
                    model: Order,
                    attributes: [],
                    where: {
                        created_at: {
                            [Op.between]: [range.beginDate, range.endDate]
                        },
                    },
                    required: false
                },
                    {
                        model: InsuranceCompany,
                        attributes: []
                    }, {
                        model: Thumbup,
                        attributes: []
                    }, {
                        model: File,
                        attributes: []
                    }
                ],
                group: 'id',
                order: [
                    [order, 'DESC'],
                    ['created_at', 'DESC']
                ],
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
                subQuery: false
            })
        ]);

        return {
            content: dataList[1],
            pageNumber,
            pageSize,
            totalElements: dataList[0].length
        };
    }

    async like(params) {
       const row ={
        thumbupId: params.thumbupId,
        userId: params.userId
       };
       const res = await this.ctx.model.Thumbup.create(row);
       return res;
    }

    async unlike(params) {
       const row ={
        thumbupId: params.thumbupId,
        userId: params.userId
       };
       const res = await this.ctx.model.Thumbup.destroy({
        where: row
       });
       return res;
    }
}

module.exports = UserService;
