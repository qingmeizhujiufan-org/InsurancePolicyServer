'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class AttachmentService extends Service {

    async upload(fieldsValue) {
        const ctx = this.ctx;
        const params = {
            id: UUID.v1(),
            ...fieldsValue
        };
        const res = await ctx.model.Attachment.create(params);

        return {
            rowsAffected: res,
            id: params.id
        };
    }

    async queryListByIds(ids) {
        const ctx = this.ctx;
        let res = [];
        debugger;
        if (ids && typeof ids === 'string') {
            res = await ctx.model.Attachment.findAll({
                where: {id: ids.split(',')},
                attributes: ['id', 'fileName', 'fileType', 'mimeType', 'created_at'],
                order: [['created_at', 'asc']],
            });
        }

        return res;
    }
}

module.exports = AttachmentService;
