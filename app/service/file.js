'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class FileService extends Service {

  async upload(fieldsValue) {
    const ctx = this.ctx;
    const params = {
      id: UUID.v1(),
      ...fieldsValue
    };
    const res = await ctx.model.File.create(params);

    return {
      rowsAffected: res,
      id: params.id,
    };
  }

  async queryListByIds(ids) {
    const ctx = this.ctx;
    let res = [];
    debugger;
    if (ids && typeof ids === 'string') {
      res = await ctx.model.File.findAll({
        where: { id: ids.split(',') },
        attributes: ['id', 'fileName', 'fileType', 'mimeType', 'created_at'],
        order: [
          ['created_at', 'asc']
        ],
      });
    }

    return res;
  }

  async queryListById(id) {
    const ctx = this.ctx;
    let res = [];

    res = await ctx.model.File.findOne({
      where: { id },
      attributes: ['id', 'fileName', 'fileType', 'mimeType', 'created_at'],
      order: [
        ['created_at', 'asc']
      ],
    });


    return res;
  }
}

module.exports = FileService;