const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '*/1 *',
      cronOptions: {
        currentDate: '2019-07-31 23:59:59',
        // utc: 'UTC'
      },
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { Thumbup } = this.ctx.model;
    const res = await this.ctx.model.query("delete FROM `code_info`");
  }
}

module.exports = UpdateCache;