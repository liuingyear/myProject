var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

app.use('/', proxy({
    target: 'http://domain2.com:8080',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes (proxyRes, req, res) {
        res.headersSent('Access-Control-Allow-Origin', 'http://www.domain1.com');
        res.headersSent('Access-Control-Allow-Credentials', true);
    },
    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'www.domain1.com' // 可以为false，表示不修改
}));

app.listen(8888);
console.log('服务器已启动，监听8888端口');
