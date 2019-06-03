'use strict';

const BaseController = require('../core/BaseController');
const path = require('path');
const images = require('images');
const Duplex = require('stream').Duplex;

class AttachmentController extends BaseController {

    streamToBuffer(stream) {
        return new Promise((resolve, reject) => {
            const buffers = [];
            stream.on('error', reject);
            stream.on('data', data => buffers.push(data));
            stream.on('end', () => resolve(Buffer.concat(buffers)));
        });
    }

    bufferToStream(buffer) {
        let stream = new Duplex();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }

    async upload() {
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();
        const filename = stream.filename;
        const result = await ctx.service.attachment.upload({
            fileName: filename,
            fileType: path.extname(filename),
            mimeType: stream.mimeType,
            // file_size: readableState.length,
            // file_path: `app/upload/${filename}`
        });

        if (result.rowsAffected) {
            let buffer = await this.streamToBuffer(stream);
            const target = path.join(this.config.baseDir, 'app/public', result.id + path.extname(filename).toLowerCase());
            images(buffer).save(target, {quality: 50});

            this.success({
                id: result.id
            });
        } else {
            this.fail({
                backMsg: '上传失败'
            });
        }
    }

    async queryListByIds() {
        const ctx = this.ctx;
        const params = ctx.query;
        console.log('params === ', params.ids);
        if (!params.ids) {
            this.fail({backMsg: "缺少参数ids！"});
        } else {
            const result = await ctx.service.attachment.queryListByIds(params.ids);
            if (result) {
                this.success({
                    backData: result,
                    backMsg: '查询成功！'
                });
            } else {
                this.fail({backMsg: "查询失败！"});
            }
        }
    }
}

module.exports = AttachmentController;
