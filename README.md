# 基于koa和mongoDb的签到系统

[文档说明](https://juejin.im/post/5d6e53a8518825502554216a)

### Installation

```
npm install
```
### Usage

注意：此步骤需要安装mongoDb数据库。
```
node app.js
```

### 目录

```
├── api // 接口请求处理
│   ├── index.js
│   └── modules
│       ├── sign.js // 签到接口
│       └── user.js // 用户接口
├── app.js // 程序入口
├── database // 连接数据库
│   ├── index.js
│   └── schema
│       ├── Sign.js // 签到数据库
│       └── User.js // 用户数据库
├── package.json
├── utils
│   ├── moment.js // 时间格式化
│   ├── sign.js // 签到
│   ├── token.js // token管理
│   └── user.js // 查找用户
└── yarn.lock
```

### Todo List
- [x] 注册登录
- [x] 签到
- [ ] electron+react 签到客户端页面   
