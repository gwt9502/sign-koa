const mongoose = require('mongoose');
const { Schema } = mongoose;
const md5 = require('blueimp-md5');

mongoose.set('userCreateIndex', true);

const userSchema = new Schema({
  userName: {
    type: String,
    index: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(v);
      }
    },
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

/**
 * 保存用户信息之前先加密
 */
userSchema.pre('save', function(next) {
  this.password = md5(this.password);
  next();
});

mongoose.model('User', userSchema);