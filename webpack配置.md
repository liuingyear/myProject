# 配置webpack
+ 初始化一个打包环境                    npm init  
+ 去一个打包名字 webpack_test
+ 先全局安装 webpack 和 webpack-cli           npm webpack webpack-cli -g
+ 再本地安装 webpack 和webpack-cli              npm webpack webpack-cli -D
+ 创建src入口文件夹，里面创建index.js入口文件
+ 创建build打包文件夹
+ 创建webpack.config.js  
+ 安装 css-loader style-loader                  npm i style-loader css-loader -D
+ 安装 less-loader                              npm i less less-loader -D
+ 安装html插件                                  npm i html-webpack-plugin -D
+ css中打包图片文件                              npm i url-loader file-loader -D                      
+ html中含有图片文件                             npm i html-loader -D  
+ 还需配置 esModule: false
+ 开发服务器 devServer                           npm i webpack-dev-server -D


+ 打包字体图标资源



+ tips: npm安装失败时强制清楚缓存  npm cache clean --force