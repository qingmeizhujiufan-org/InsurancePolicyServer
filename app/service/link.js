'use strict';

const Service = require('egg').Service;

class LinkService extends Service {

    async queryDetail() {
        const res = await this.ctx.model.Link.findAll();
        return res;
    }

    async update(params) {
        const res = await this.ctx.model.Link.update(params, {where: {id: '1'}});
        return res;
    }

    async queryOne(params) {
        const {id, userId} = params;
        const res = await this.ctx.model.Link.findOne({
            where: {
                id,
                userId
            }
        });
        return res;
    }
}

module.exports = LinkService;
