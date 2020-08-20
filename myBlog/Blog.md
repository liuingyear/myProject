## 中台搭建

- 安装 egg.js ：npm i -g egg-init
- 创建 service 文件夹
- 初始化 egg 项目：egg-init --type=simple
- 依赖包下载：npm install
- 运行项目：npm run dev

## 简单使用以下 egg

- 在 hom.js 中编写一个 list 方法

```
async list () {
    const { ctx } = this;
    ctx.body = "list page";
}
```

- 在 router.js 页面配置路由

```
router.get('/list', controller.home.list);
```

这样就能在地址栏输入 http://127.0.0.1:7001/list 访问 list 页面了

## RESTFul api 设计和路由配置

前后端分离的接口设计
在 app 文件夹下创建 router 文件夹，router 文件夹下创建 admin.js 和 default.js 文件

- default.js 中创建路由

```
module.export = app => {
    const { router, controller } = app;
    router.get('/default/index', controller.default.home.index);
}
```

在 /app/controller 中创建 admin 文件夹和 default 文件夹
创建 /app/controller/default/home.js
home.js:

```
"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "前台api接口";
  }
}

module.exports = HomeController;
```

在 app/router.js 中引入新修改的路由配置文件 /router/default.js

```
module.export = app => {
    require('./router/default')(app);
}
```

## egg-mysql 安装

npm i --save egg-mysql

npm i axios

解决 egg 的端口号不同造成的跨域问题
1、安装 egg-cors
npm i egg-cors
2、在 service/config/plugin.js 中配置

```
exports.cors = {
  enable: true,
  package: "egg-cors"
}
```

3、在 service/config/config.default.js 中配置

```
config.security = {
  csrf: {
    enable: false
  },
  domainWhiteList: ['*]
}
config.cors = {
  origin: "*",
  allowMethods: "GET, HEAD,PUT,DELETE,PATCH,OPTIONS"
}
```

