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
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const Op = Sequelize.Op;
        const Code = ctx.model.Code;
        const now = new Date();
        const before = new Date(now.getTime() - 5 * 60 * 1000);
        const res = Code.findAll({
            where: {
                created_at: {
                    [Op.between]: [before, now]
                },
            },
            order: [
                ['created_at', 'DESC']
            ]
        })
        return res
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
            order = 'orderSum';
        }
        if (condition === 1) {
            order = 'orderNum';
        }

        const res = await ctx.model.query("SELECT " +
            "`User`.`id`, " +
            "`User`.`realname`, " +
            "`User`.`headimgurl`, " +
            "`User`.`bgId`, " +
            "`File`.`file_type` AS `fileType`, " +
            "`InsuranceCompany`.`company_name` AS `companyName`, " +
            "`Orders`.`orderSum`, " +
            "`Orders`.`orderNum`, " +
            "`Thumbups`.`thumbupNum` " +
            "FROM " +
            "`user_info` AS `User` " +
            "LEFT OUTER JOIN ( " +
            "SELECT " +
            "`Orders`.`id`, " +
            "`Orders`.`user_id`, " +
            "SUM( `Orders`.`insurance` ) AS `orderSum`, " +
            "COUNT( `Orders`.`user_id` ) AS `orderNum`, " +
            "`Orders`.`insured_time` " +
            "FROM " +
            "`order_info` AS `Orders` " +
            "GROUP BY " +
            "`Orders`.`user_id` " +
            ") `Orders` ON `User`.`id` = `Orders`.`user_id` " +
            "AND `Orders`.`insured_time` BETWEEN '" + new Moment(range.beginDate).format('YYYY-MM-DD HH:mm:ss') + "' " +
            "AND '" + new Moment(range.endDate).format('YYYY-MM-DD HH:mm:ss') + "' " +
            "LEFT OUTER JOIN `insurance_company_info` AS `InsuranceCompany` ON `User`.`company` = `InsuranceCompany`.`id` " +
            "LEFT OUTER JOIN (" +
            "SELECT " +
            "`Thumbups`.`thumbup_id`, " +
            "COUNT( `Thumbups`.`thumbup_id` ) AS `thumbupNum` " +
            "FROM " +
            "`thumbup_info` AS `Thumbups` " +
            "GROUP BY " +
            "`Thumbups`.`thumbup_id` " +
            ") `Thumbups` ON `User`.`id` = `Thumbups`.`thumbup_id` " +
            "LEFT OUTER JOIN `file_info` AS `File` ON `User`.`headimgurl` = `File`.`id` " +
            "GROUP BY " +
            "`id` " +
            "ORDER BY " +
            "`Orders`." + order + " DESC, " +
            "`User`.`created_at` DESC  ", {type: 'SELECT'});

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
            order = 'orderSum';
        }
        if (condition === 1) {
            order = 'orderNum';
        }

        const dataList = await Promise.all([
            User.findAll(),
            ctx.model.query("SELECT " +
                "`User`.`id`, " +
                "`User`.`realname`, " +
                "`User`.`headimgurl`, " +
                "`User`.`bgId`, " +
                "`File`.`file_type` AS `fileType`, " +
                "`InsuranceCompany`.`company_name` AS `companyName`, " +
                "`Orders`.`orderSum`, " +
                "`Orders`.`orderNum`, " +
                "`Thumbups`.`thumbupNum` " +
                "FROM " +
                "`user_info` AS `User` " +
                "LEFT OUTER JOIN ( " +
                "SELECT " +
                "`Orders`.`id`, " +
                "`Orders`.`user_id`, " +
                "SUM( `Orders`.`insurance` ) AS `orderSum`, " +
                "COUNT( `Orders`.`user_id` ) AS `orderNum`, " +
                "`Orders`.`insured_time` " +
                "FROM " +
                "`order_info` AS `Orders` " +
                "GROUP BY " +
                "`Orders`.`user_id` " +
                ") `Orders` ON `User`.`id` = `Orders`.`user_id` " +
                "AND `Orders`.`insured_time` BETWEEN '" + new Moment(range.beginDate).format('YYYY-MM-DD HH:mm:ss') + "' " +
                "AND '" + new Moment(range.endDate).format('YYYY-MM-DD HH:mm:ss') + "' " +
                "LEFT OUTER JOIN `insurance_company_info` AS `InsuranceCompany` ON `User`.`company` = `InsuranceCompany`.`id` " +
                "LEFT OUTER JOIN (" +
                "SELECT " +
                "`Thumbups`.`thumbup_id`, " +
                "COUNT( `Thumbups`.`thumbup_id` ) AS `thumbupNum` " +
                "FROM " +
                "`thumbup_info` AS `Thumbups` " +
                "GROUP BY " +
                "`Thumbups`.`thumbup_id` " +
                ") `Thumbups` ON `User`.`id` = `Thumbups`.`thumbup_id` " +
                "LEFT OUTER JOIN `file_info` AS `File` ON `User`.`headimgurl` = `File`.`id` " +
                "GROUP BY " +
                "`id` " +
                "ORDER BY " +
                "`Orders`." + order + " DESC, " +
                "`User`.`created_at` DESC  " +
                "LIMIT " + (pageNumber - 1) * pageSize + ", " +
                "" + pageSize + ";", {type: 'SELECT'})
        ]);
        console.log('dataList[1] === ', dataList[1]);

        return {
            content: dataList[1],
            pageNumber,
            pageSize,
            totalPages: Math.ceil(dataList[0].length / pageSize),
            totalElements: dataList[0].length
        };
    }

    async like(params) {
        const row = {
            thumbupId: params.thumbupId,
            userId: params.userId
        };
        const res = await this.ctx.model.Thumbup.create(row);
        return res;
    }

    async unlike(params) {
        const row = {
            thumbupId: params.thumbupId,
            userId: params.userId
        };
        const res = await this.ctx.model.Thumbup.destroy({
            where: row
        });
        return res;
    }

    async countLike(params) {
        const Sequelize = this.app.Sequelize;
        const {Thumbup} = this.ctx.model;
        const res = await Thumbup.find({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('thumbup_id')), 'thumbupNum']
            ],
            where: {
                thumbupId: params.thumbupId
            }
        })
        return res;
    }
}

module.exports = UserService;
