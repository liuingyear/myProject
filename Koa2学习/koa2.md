- 安装 koa
  npm i --save koa

* koa 使用
  新建 index.js

```
const Koa = require("koa")
const app = new Koa();
app.use(async (ctx) => {
    ctx.body = "hello world"
})
app.listen(3000)
```

在命令行中输入 node index.js
浏览器中输入 http://localhost:3000

- async 函数返回的是一个 Promise 对象

* 两种方式获取 Get 请求参数

```
//从request中获取Get请求
let request = ctx.request;
let req_query = request.query;
let req_querystring = request.querystring;
//从上下文中获取Get请求
let ctx_query = ctx.query;
let ctx_querystring = ctx.querystring;
```
