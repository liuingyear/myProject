+ 创建项目：create-react-app demo01
+ 进入demo01，安装 React Router : npm install --save react-router-dom

+ 创建文件AppRouter.js
+ 引入
```
import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
```
+ 使用方式
```
<Router>
    <Link to="">名字</Link>
    <Route path="" component={组件名}></Route>
</Router>
```
tips：exact（精确匹配）

+ Route 动态传值
```
<Route path="/:id" component={List}></Route>
```
+ 在 List 组件中接收值，在 componentDidMount 中进行，使用 this.props.match 进行获取
+ this.props.match 中包含： 
patch: 路由规则
url：访问路径
params：传递的参数

+ 重定向 Redirect （标签式重定向、编程式重定向）
重定向和跳转的区别是: 跳转是可以用浏览器的回退按钮返回上一级的，而重定向不可以
+ 在需要重定向的页面引入
```
import { Redirect } from "react-router-dom"
```
+ 标签式重定向：在 render 中写
```
<Redirect to="/RedirectPage/">
```
+ 编程式重定向：在 constructor 中写
```
this.props.history.push("/RedirectPage/")
```

