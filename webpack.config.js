const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    // 下载: url-loader file-loader
                    // 图片大小小鱼 8kb ，就会被base64处理
                    // 优点: 减少请求数量(减轻服务器眼里)
                    // 缺点: 图片体积会更大
                    limit: 8 * 1024,
                    // url-loader 默认使用es6模块化解析，而html-loader引入图片是common.js
                    // 解决： 关闭url-loader的es6模块化解析
                    esModule: false,
                    // 修改图片打包后的名字
                    // ext 是去图片原来的扩展名
                    name: '[hash:10].[ext]',
                    // 打包后所放文件夹
                    outputPath: 'images'
                }
            },
            {
                test: /\.html$/,
                // 处理html文件的img图（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader'
            },
            // 打包其他资源(除了htm/js/css资源以外)
            {
                exclude: /\.(css|js|html|less|png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    // 打包后所放文件夹
                    outputPath: 'iconfont'
                }
            }
        ]
    },
    plugins: [
        // 打包html文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 开发环境
    mode: 'development',

    // 开发服务器 devServer： 用来自动化编译
    // 特点： 只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为： webpack-dev-server ，本地启动 npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        // 启动Gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
}