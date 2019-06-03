'use strict';

module.exports = app => {
    app.beforeStart(async () => {
        const room = await app.redis.get('room:admin');
        if (!room) {
            await app.redis.set('room:admin', 'admin');
        }
    });
};
