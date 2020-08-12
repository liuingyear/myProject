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

- 获取 POST 请求参数以及参数解析

```
const Koa = require("koa");
let app = new Koa();
app.use(async (ctx) => {
  if (ctx.url === "/" && ctx.method === "GET") {
    let html = `
            <h1>Koa2 request post demo</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName"/><br/>
                <p>age</p>
                <input name="age"/><br/>
                <p>webSite</p>
                <input name="webSite"/><br/>
                <button type="submit">submit</button>
            </form>
        `;
    ctx.body = html;
  } else if (ctx.url === "/" && ctx.method === "POST") {
    let postData = await parsePostData(ctx);
    ctx.body = postData;
  } else {
    ctx.body = "<h1>404</h1>";
  }
});
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = "";
      ctx.req.on("data", (data) => {
        postData += data;
      });
      ctx.req.addListener("end", () => {
        resolve(parseQueryStr(postData));
      });
    } catch (error) {
      reject(error);
    }
  });
}
function parseQueryStr(queryStr) {
  let queryData = {};
  let queryStrList = queryStr.split("&");
  for (let queryStr of queryStrList.values()) {
    let itemList = queryStr.split("=");
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }
  return queryData;
}

app.listen(3000, () => {
  console.log("Server is starting");
});

```

- koa 中间件 koa-bodyparser
  安装：npm i --save koa-bodyparser

```
// 引入
let bodyparser = require('koa-bodyparser')
app.use(bodyparser())

// 在 POST 请求接受参数处直接使用 ctx.request.body 进行接收处理好的参数
ctx.body = ctx.request.body
```

- Koa2 原生路由
  详情见 koaRoute.js
  （需要新建 page 文件夹，里面包含 index.html/todo.html/404/html）

* 路由中间件
  安装：npm i --save koa-router
  // get 请求

  ```
  const Koa = require("koa");
  const Router = require("koa-router");

  const app = new Koa();
  const router = new Router();

  router
    .get("/", (ctx, next) => {
      ctx.body = "hello world";
    })
    .get("/todo", (ctx, next) => {
      ctx.body = "todo page";
    });

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(3000, () => {
    console.log("server is starting");
  });
  ```
