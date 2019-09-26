const moment = require('moment');

const DATE = new Date();

/**
 * 获取带时分秒的日期
 */
exports.originDate = () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

/**
 * 获取当前年和月
 * 201912
 */
exports.yearWithMonth = (date = DATE) => Number(moment(date).format('YYYYMM'));

/**
 * 获取当前日期
 * 20191212
 */
exports.yearWithMonthAndDay = (date = DATE) => Number(moment(date).format('YYYYMMDD'));

/**
 * 初始化返回的数据
 * @param {Array} signDate 签到的数据
 */
exports.monthInit = signDate => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  /**
   * 返回的数组里面内容格式
   */
  const signDayInfo = {
    hasSign: false,
  };
  const days = new Date(year, month, 0).getDate();
  const INITARRAY = [...Array(days)].map((_, index) => ({
    signDay: Number(moment().date(index + 1).format('YYYYMMDD')),
    ...signDayInfo
  }));
  for (const i of signDate) {
    const splitIndex = Number(i.signDay.toString().substr(-2)) - 1;
    INITARRAY.splice(splitIndex, 1, {
      hasSign: true,
      ...i._doc,
    });
  }
  return INITARRAY;
}
