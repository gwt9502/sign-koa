const mongoose = require('mongoose');
const { getUserInfo } = require('./user');
const { yearWithMonth } = require('./moment');

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
        })
        .then(async signDate => {
          resolve(signDate);
        });
      } else {
        reject('用户不存在');
      }
    })
  })
}