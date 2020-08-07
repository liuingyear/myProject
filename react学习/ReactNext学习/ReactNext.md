+ React Next 安装
npm init
npm i --save react react-dom next

两种方式配置 Next
+ 手动配置 next
***
在 package.json 中编写，在 scripts 中添加 dev、build、start
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "next",
    "build": "next build",
    "start": "next start"
}
```
+ 在根目录下新建一个 pages 文件夹
+ 在 pages 中新建一个 index.js
+ 在 Index.js 中编写一个方法 Index ，并且导出
+ 运行项目 npm run dev
***
+ 自动配置 Next
***
+ 全局安装 create-next-app 脚手架工具
npm i -g create-next-app

+ 创建 Next 项目
npx create-next-app next-create 

+ 进入创建的文件夹 next-create

***
pages 文件夹中创建的文件为直接路由可以访问的组件
components 文件夹下创建的文件为在 pages 文件夹下的文件中使用的子组件

+ 在项目的目录下的 pages 中新建一个文件，可以在地址栏中输入文件名进行访问
+ 在 components 创建一个子组件，并且在 pages 文件夹中的文件里进行引用
***
+ 路由的标签跳转
```
// 引入 Link 标签
import Link from 'next/link'
// 在 index.js 页面编写 Home 方法
// Link 标签里面一定要包含一个父标签才能写两个及以上的标签（类似template），官网使用的 <a> 标签
export default () => (
    <>
        <div>首页</div>
        <Link href="/pageA"><a>去A页面</a></Link>
        <Link href="/pageB"><a>去b页面</a></Link>
    </>
)
```
+ Router 进行跳转
```
// 在 index.js 中引入 Router
import Router from 'next/router'
// 在方法中使用
<button onClick={()=>Router.push('/pageA')}>去A页面</button>
```
+ 路由动态传递参数
使用 query 来传递参数
```
// 在 index.js 中添加跳转参数
<Link href="/queryPage?name=123456"><a>去queryPage页面</a></Link>
// 或者
<button onClick={()=>Router.push({pathname: "queryPage", query: {name: '456789'}})}>去A页面</button>

// 在 pages 文件夹下新建文件 queryPage.js
// queryPage.js
// 最主要的是使用 withRouter 方法

import { withRouter } from 'next/router'
import Link from 'next/link'

const queryPage = ({router}) => {
    return (
        <>
            <div>{router.query.name}</div>
        <Link href="/">返回首页</Link>
        </>
    )
}
export default withRouter(queryPage)
```
***
+ 路由的6个钩子事件
routeChangeStart
routeChangeComplete
beforeHistoryChange
routeChangeError
hashChangeStart
hashChangeComplete

+ 通过 Router.events.on 来监听路由的钩子事件
```
Router.events.on('routeChangeStart', (...args) => {
    console.log(...args)
})
```
+ 在 getInitialProps 中使用 axios 获取远端数据
```
const queryPage = ({router, list}) => {
    return (
        <>
        <!-- 这里的 list 对应的就是返回的 promise -->
            <div>list</div>
        </>
    )
}
queryPage.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
        axios(url).then(
            (res) => {
                console.log(res)
                resolve(res)
            }
        )
    })
    return await promise
}
// 使用 withRouter 能够进行动态传递路由参数
export default withRouter(queryPage)
```
***
+ 使用 JSX style 来进行样式编写
```
function example () {
    return (
        <>
            <div>颜色为红色的字体</div>

            <style jsx>
                {`
                    div{color: red}
                    <!-- 使用模板字符串可以动态改变颜色 -->
                    div{color: ${color}}
                `}
            </style>
        </>
    )
}
```
***
+ LazyLoading 
<!-- 远端文件的懒加载 -->
moment.js 的懒加载
```
    function Time () {
        const [currentTime, setTime] = useState(Date.now())
        const changeTime = async () => {
            const moment = await import('moment')
            setTime(moment.default(Date.now()).format())
        }
        return (
            <>
                <div>{currentTime}</div>
            <div><button onClick={changeTime}>改变时间格式</button></div>
            </>
        )
    }
```
<!-- 自定义文件的懒加载 -->
```
// 在 components 下生成一个子组件 child

// 在 Time.js 中引入 dynamic
import dynamic from 'next/dynamic'
// 加载子组件
const Child = dynamic(import('../components/child'))
<Child />
// 会在控制台看见一个 2.js 就是懒加载 child 文件
```
