const mongoose = require('mongoose');
const { getUserInfo } = require('./user');
const { yearWithMonth, yearWithMonthAndDay } = require('./moment');

/**
 * 获取签到列表
 * @param ctx 上下文
 */
exports.getSignList = (ctx) => {
  // month 格式为201912，区分年
  const { month } = ctx.query;
  return new Promise((resolve, reject) => {
    getUserInfo(ctx)
    .then(async user => {
      if (user) {
        const SignModel = mongoose.model('Sign');
        await SignModel.find({
          userId: user._id,
          month: month ? month : yearWithMonth(),
        }).sort('signDay')
        .then(async signDate => {
          resolve(signDate);
        });
      } else {
        reject('用户不存在');
      }
    })
  })
};

/**
 * 获取用户有没有签到
 */
exports.getSignState = ctx => {
  const { signDay = yearWithMonthAndDay() } = ctx.request.body;
  return new Promise((resolve, reject) => {
    if (!signDay) {
      reject('缺少参数');
    }
    getUserInfo(ctx)
    .then(async user => {
      const SignModel = mongoose.model('Sign');
      await SignModel.findOne({
        userId: user._id,
        signDay: signDay,
      })
      .then(async signDate => {
        if (signDate) {
          reject('当日你已签到');
        } else {
          resolve(user);
        }
      });
    });
  });
}