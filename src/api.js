/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * @flow
 */




export default {
    sourceHost: sourcePath,
    loginUrl: apiPath + '/user/login',
    indexFind:apiPath + '/index/find',

    selectYear: apiPath + '/periodicals/selectYear',

    //获取用户session_key
    getSessionKey: apiPath + '/wechat/getSeesionKey',
    //根据unionid查询用户信息
    findByUnionId: apiPath +'/member/findByUnionId',
    //保存用户信息
    saveMember: apiPath +'/member/saveMember',
    //会员购买记录
    findByCreatedBy: apiPath+'/buy/findByCreatedBy',
    //账户操作记录
    findBalanceRecord: apiPath +'/commiss/findByUserId',
    //创建订单
    createOrder: apiPath + '/buy/createOrder',
    //公众号支付
    wechatPay: apiPath + '/wechat/pay',
    //获取系统配置
    findByCode: apiPath + '/sysConfig/findByCode',
    //获取二维码
    getQuickMark: apiPath + '/wechat/getQuickMark',
    //提现
    withdraw: apiPath + '/gwithdraw/apply',

    // 月刊
    magazineList: apiPath + '/periodicals/selectByYear',
    mazIndexList: apiPath + '/periodicals/findArticleByPid',
    magazineArc: apiPath + '/periodicals/findDetailById',
    magazineInfo: apiPath + '/periodicals/findById',

    // 小课
    xkList: apiPath + '/course/findCourseByPage',
    xkInfo: apiPath + '/course/selectByVid',
    xkLesson: apiPath + '/course/selectdetailById',
    xkLIndex: apiPath + '/course/selectContentByVid',

    // 支付
    pay: apiPath + '/pay/pay',


}
