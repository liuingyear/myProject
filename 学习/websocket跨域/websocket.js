const http = require('http');
const socket = require('socket.io');

// 启动http服务
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end();
});
server.listen('8080');
console.log('Server is running at port 8080');

// 监听socket连接
socket.listen(server).on('connection', client => {
    client.on('message', msg => {
        client.send('hello: ' + msg);
        console.log('data from client:--->' + msg);
    });
    // 断开处理
    client.on('disconnect', () => {
        console.log('Client socket has closed');
    });
});
