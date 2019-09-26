const mongoose = require('mongoose');
const { yearWithMonth, yearWithMonthAndDay, originDate } = require('../../utils/moment');
const { Schema } = mongoose;

const signSchema = new Schema({
  userId: {
    type: String,
    index: true,
  },
  userName: String,
  month: {
    type: Number,
    default: yearWithMonth(),
  },
  signDay: {
    type: Number,
    default: yearWithMonthAndDay(),
  },
  operateDate: {
    type: String,
    default: originDate(),
  }
});

/**
 * 创建复合索引
 */
signSchema.index({userId: 1, month: 1});
signSchema.index({userId: 1, signDay: 1});

mongoose.model('Sign', signSchema);
