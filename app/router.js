'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller, io} = app;
    const UserInterceptor = app.middleware.userInterceptor({}, app);
    router.get('/api', controller.home.index);

    /* 后台管理登录 */
    router.post('/api/admin/login', controller.admin.login);
    /* 获取用户列表 */
    router.get('/api/admin/queryList', UserInterceptor, controller.admin.queryList);
    /* 获取用户详情 */
    router.get('/api/admin/qureyOneUser', UserInterceptor, controller.admin.qureyOneUser);
    /* 后台新增管理人员 */
    router.post('/api/admin/add', UserInterceptor, controller.admin.add);
    /* 后台修改管理人员 */
    router.post('/api/admin/updateUser', UserInterceptor, controller.admin.updateUser);
    /* 后台删除用户 */
    router.post('/api/admin/delete', UserInterceptor, controller.admin.delete);
    /* 后台用户冻结 */
    router.post('/api/admin/frozen', UserInterceptor, controller.admin.frozen);
    /* 后台重置密码 */
    router.post('/api/admin/resetPassword', UserInterceptor, controller.admin.resetPassword);

    /* 角色列表 */
    router.get('/api/role/queryList', UserInterceptor, controller.role.queryList);

    /* 查询商家食品列表 */
    router.get('/api/food/queryList', controller.food.queryList);
    /* 查询审核通过食品列表 */
    router.get('/api/food/queryAdminList', controller.food.queryAdminList);
    /* 查询商铺推荐产品列表 */
    router.get('/api/food/queryListByShopId', controller.food.queryListByShopId);

    /* 查询产品详情 */
    router.get('/api/food/queryDetail', controller.food.queryDetail);
    /* 新增产品 */
    router.post('/api/food/add', UserInterceptor, controller.food.add);
    /* 更新产品信息 */
    router.post('/api/food/update', UserInterceptor, controller.food.update);
    /* 删除产品 */
    router.post('/api/food/delete', UserInterceptor, controller.food.delete);
    /* 查询产品全部分类列表 */
    router.get('/api/food/queryAllCategoryList', controller.food.queryAllCategoryList);
    /* 查询产品分类列表 */
    router.get('/api/food/queryCategoryList', UserInterceptor, controller.food.queryCategoryList);
    /* 新增产品分类 */
    router.post('/api/food/categoryAdd', UserInterceptor, controller.food.categoryAdd);
    /* 查看产品分类信息 */
    router.get('/api/food/categoryDetail', UserInterceptor, controller.food.categoryDetail);
    /* 更新产品分类信息 */
    router.post('/api/food/categoryUpdate', UserInterceptor, controller.food.categoryUpdate);
    /* 删除产品分类信息 */
    router.post('/api/food/categoryDelete', UserInterceptor, controller.food.categoryDelete);
    /* 推荐 */
    router.post('/api/food/recommend', controller.food.recommend);
    /* 食品审核 */
    router.post('/api/food/check', controller.food.check);
    /* 查询食品Top3 */
    router.get('/api/food/queryListTop3', controller.food.queryListTop3);


    /* 查询商铺列表 */
    router.get('/api/foodKeeper/queryList', UserInterceptor, controller.foodKeeper.queryList);
    /* 查询商铺详情 */
    router.get('/api/foodKeeper/queryDetail', controller.foodKeeper.queryDetail);
    /* 新增商铺 */
    router.post('/api/foodKeeper/add', UserInterceptor, controller.foodKeeper.add);
    /* 更新商铺信息 */
    router.post('/api/foodKeeper/update', UserInterceptor, controller.foodKeeper.update);
    /* 删除商铺信息 */
    router.post('/api/foodKeeper/check', UserInterceptor, controller.foodKeeper.check);

    /* 附件上传 */
    router.post('/api/attachment/upload', controller.attachment.upload);
    /* 根据id查找附件 */
    router.get('/api/attachment/queryListByIds', controller.attachment.queryListByIds);

    /*
     * APP接口
     */
    /* 微信授权登录 */
    router.get('/api/app/login', controller.app.login);
    /* 移动获取顶部滚动图片 */
    router.get('/api/app/queryTopSliderList', controller.app.queryTopSliderList);
    /* 查询顶部滚动图片详情 */
    router.get('/api/app/queryTopSliderDetail', controller.app.queryTopSliderDetail);
    /* 新增移动端滚动图片 */
    router.post('/api/app/addTopSlider', UserInterceptor, controller.app.addTopSlider);
    /* 修改移动端滚动图片 */
    router.post('/api/app/updateTopSlider', UserInterceptor, controller.app.updateTopSlider);
    /* 删除移动端滚动图片 */
    router.post('/api/app/delTopSlider', UserInterceptor, controller.app.delTopSlider);

    /* 查询特色名宿列表 */
    router.get('/api/hotel/queryList', controller.hotel.queryList);
    /* 移动端查询所有民宿 */
    router.get('/api/hotel/queryMobileList', controller.hotel.queryMobileList);
    /* 查询特色名宿详情 */
    router.get('/api/hotel/queryDetail', controller.hotel.queryDetail);
    /* 新增特色名宿*/
    router.post('/api/hotel/add', controller.hotel.add);
    /* 更新特色名宿 */
    router.post('/api/hotel/update', controller.hotel.update);
    /* 删除特色名宿 */
    router.post('/api/hotel/delete', controller.hotel.delete);
    /* 名宿订单查询（用户端） */
    router.get('/api/hotel/queryOrderList', controller.hotel.queryOrderList);
    /* 民宿订单详情查询*/
    router.get('/api/hotel/queryOrderDetail', controller.hotel.queryOrderDetail);
    /* 民宿订单评论*/
    router.post('/api/hotel/comment', controller.hotel.comment);
    /* 名宿订单查询（管理端） */
    router.get('/api/hotelKeeper/queryOrderList', controller.hotel.queryOrderList);
    /* 订单确认 */
    router.post('/api/hotelKeeper/orderCheck', controller.hotel.orderCheck);
    /* 民宿订单删除 (客户端)*/
    // router.get('/api/hotel/orderDelete', controller.hotel.orderDelete);

    /* 查询名宿房间列表 */
    router.get('/api/room/queryList', controller.room.queryList);
    /* 查询房间Top3 */
    router.get('/api/room/queryListTop3', controller.room.queryListTop3);
    /* 管理员查询所有房间列表 */
    router.get('/api/room/queryAdminList', controller.room.queryAdminList);
    /* 移动端查询所有房间 */
    router.get('/api/room/queryMobileList', controller.room.queryMobileList);
    /* 查询名宿房间详情 */
    router.get('/api/room/queryDetail', controller.room.queryDetail);
    /* 新增房间*/
    router.post('/api/room/add', controller.room.add);
    /* 更新名宿房间 */
    router.post('/api/room/update', controller.room.update);
    /* 更新名宿房间状态 */
    router.post('/api/room/updateStatus', controller.room.updateStatus);
    /* 删除名宿房间 */
    router.post('/api/room/delete', controller.room.delete);
    /* 预订 */
    router.post('/api/room/reserve', controller.room.reserve);
    /* 查询评论 */
    router.get('/api/room/comment', controller.room.queryCommentList);
    /* 民宿订单列表查询 */
    // router.get('/api/room/queryOrderList', controller.room.queryOrderList);
    /* 推荐 */
    router.post('/api/room/recommend', controller.room.recommend);

    /* 旅游商家列表查询 */
    router.get('/api/travelKeeper/queryList', controller.travelKeeper.queryList);
    /* 旅游商家信息查询 */
    router.get('/api/travelKeeper/queryDetail', controller.travelKeeper.queryDetail);
    /* 旅游商家新增 */
    router.post('/api/travelKeeper/add', controller.travelKeeper.add);
    /* 旅游商家更新 */
    router.post('/api/travelKeeper/update', controller.travelKeeper.update);
    /* 旅游商家更新 */
    router.post('/api/travelKeeper/check', controller.travelKeeper.check);
    /* 旅游订单列表查询(管理端)*/
    router.get('/api/travelKeeper/queryOrderList', controller.travelKeeper.queryOrderList);
    /* 旅游商家订单确认 */
    router.post('/api/travelKeeper/orderCheck', controller.travelKeeper.orderCheck);

    /* 查询主题旅游列表 */
    router.get('/api/travel/queryList', controller.travel.queryList);
    /* 查询审核通过旅游列表 */
    router.get('/api/travel/queryAdminList', controller.travel.queryAdminList);
    /* 查询主题旅游Top3 */
    router.get('/api/travel/queryListTop3', controller.travel.queryListTop3);
    /* 查询旅游详情 */
    router.get('/api/travel/queryDetail', controller.travel.queryDetail);
    /* 新增主题旅游 */
    router.post('/api/travel/add', controller.travel.add);
    /* 更新主题旅游信息 */
    router.post('/api/travel/update', UserInterceptor, controller.travel.update);
    /* 更新主题旅游信息 */
    router.post('/api/travel/delete', UserInterceptor, controller.travel.delete);
    /* 报名旅游 */
    router.post('/api/travel/signTravel', controller.travel.signTravel);
    /* 新增主题旅游审核 */
    router.post('/api/travel/check', controller.travel.check);
    /* 推荐 */
    router.post('/api/travel/recommend', controller.travel.recommend);
    /* 旅游订单列表查询 (客户端)*/
    router.get('/api/travel/queryOrderList', controller.travel.queryOrderList);
    /* 旅游订单删除 (客户端)*/
    // router.get('/api/travel/orderDelete', controller.travel.orderDelete);
    /* 旅游订单详情查询*/
    router.get('/api/travel/queryOrderDetail', controller.travel.queryOrderDetail);


    /* 收获地址列表查询*/
    router.get('/api/address/queryList', controller.address.queryList);
    /* 收获地址详情查询*/
    router.get('/api/address/queryDetail', controller.address.queryDetail);
    /*收获地址查询*/
    router.post('/api/address/add', controller.address.add);
    /*收获地址查询*/
    router.post('/api/address/update', controller.address.update);

    // socket.io
    io.of('/').route('exchange', io.controller.nsp.exchange);
};
