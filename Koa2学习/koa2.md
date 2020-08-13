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

- 路由前缀设置

* 设置常量前缀
  通过在创建路由时设置参数 prefix 可以要求页面路由必须在 prefix 参数值的路径下才能出现页面

```
const router = new Router({
  prefix: '/aaa'
});
// 在浏览器访问这个路由下的页面时都必须在路径 /aaa 下
// localhost:3000/aaa/index
```

- 设置变量的路由前缀（父子路由）

```
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

// 生成父路由
const route = new Router();

// 生成子路由
const home = new Router();
const list = new Router();

// 子路由创建路由页面

// 创建两个页面: /home/home  /home/todo
home.get('/home', async (ctx) => {
  ctx.body = 'home page';
}).get('/todo', async (ctx) => {
  ctx.body = 'todo page'
})

// 创建两个页面: /list/list  /list/todoList
list.get('/list', async (ctx) => {
  ctx.body = 'list page';
}).get('/todoList', async (ctx) => {
  ctx.body = 'todoList page'
})

// 父级路由引用子路由
route.use('/home', home.routes(), home.allowedMethods()).use('/list', list.routes(), list.allowedMethods());

// app 使用父路由
app.use(route.routes(), route.allowedMethods());
app.listen(3000)
```

- Cookie 的使用
  Koa 中主要使用 set 方法来设置 cookies，cookies 中主要包含三个参数，第一个为 cookies 的名称，第二个为 cookies 的值，第三个为 cookies 的一些参数设置，是一个对象，主要包含

```
ctx.cookies.set('MyCookies', 'CookieValue',
{
  domain: '需要设置缓存的Ip地址',
  path: '需要在哪个路径下才设置缓存，比如设置为/index,就只能在index的子目录下才能获取缓存，不设置的话可以在任何目录下获取缓存',
  maxAge: '1000*60*60*24', //缓存的时间
  expires: 'new Date('2020-08-14')', //缓存的过期事件
  httponly: false, // 是否只在http下才设置缓存
  overwrite: false // 是否能够重写缓存
}
)

```

通过 get 方法获取 cookies ，get 的参数为 cookies 的名称

```
ctx.cookies.get('MyCookies')
```

- 模板引擎 ejs
  安装插件 koa-view
  npm i --save koa-views

安装 ejs
npm i --save ejs

ejs 模板的使用需要和 koa-views 一起使用
在根目录下创建 views 文件夹，在文件夹下创建文件 index.ejs

index.ejs:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= title %></title>
  </head>
  <body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
  </body>
</html>
```

```
const Koa = require('koa');
const views = require('koa-views');
// 引入node中的文件路径读取方法
const path = require('path');
const app = new Koa();

app.use(views(path.join(__dirname, './index'), {
  extension: 'ejs'
}))

app.use(async (ctx) => {
  let title = 'Hello World';
  await ctx.render('index', {title})
}).listen(3000)
```

- 静态资源在 Koa 中引用
  安装 koa-static
  npm i --save koa-static

创建静态文件存放的文件夹 static

```
const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

const staticPath = './static';
app.use(static(path.join(__dirname, staticPath)));

app.use(async (ctx) => {
  ctx.body = "hello world";
}).listen(3000)

```

在浏览器中直接在 localhost:3000/ 后拼接 static 文件夹中的静态文件名称就可以访问到静态文件了
