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




