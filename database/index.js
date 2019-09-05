const mongoose = require('mongoose');
const db = mongoose.connection;

// 禁用model缓存
mongoose.set('bufferCommands', true);

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost:27017/signServer', { useNewUrlParser: true });
    db.once('open', () => {
      console.log('数据库链接成功');
      resolve();
    });
    db.on('error', error => {
      console.log(`数据库连接失败${error}`);
      reject();
    });
  });
};

exports.connect = connect;
exports.initSchemas = () => {
  require('./schema/User');
  require('./schema/Sign');
};