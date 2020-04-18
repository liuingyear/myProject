const http = require('http');
const querystring = require('querystring');
const app = http.createServer();
app.on('request', (req, res) => {
    var params = querystring.parse(req.url.split('?')[1]);
    var fn = params.callback;
    
    // jsonp返回设置
    res.writeHead(200, {'Content-type': 'text/javascript'});
    res.write(fn + '(' + JSON.stringify(params) + ')');
    res.end();
});
app.listen(3000);
console.log('服务器已启动，监听3000端口');