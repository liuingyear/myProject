const http = require('http');
const server = http.createServer();
const qs = require('querystring');

server.on('request', (req, res) => {
    var postData = '';

    // 数据块接收中
    req.addListener('data', chunk => {
        postData += chunk;
    });

    // 数据接收完毕
    req.addListener('end', () => {
        postData = qs.parse(postData);
        
        res.writeHead(200, {
            'Access-Control-Allow-Credentials': true,  // 后端允许发送cookie
            'Access-Control-Allow-Origin': 'http://localhost:3000',  // 允许访问的域 协议+域名+端口
            'Set-Cookie': 'l=a123456;Path=/;Domain=localhost:8080/login;HttpOnly'  // HttpOnly的作用是让js无法读取cookie
        });
        res.write(JSON.stringify(postData));
        res.end();
    });
});

server.listen(8080);
console.log('服务器已启动，监听8080端口');