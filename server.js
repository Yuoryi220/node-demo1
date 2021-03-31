var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号\nnode server.js 8888')
    process.exit(1)
}

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('客户端发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    console.log("method:");
    console.log(method);
    console.log("request.headers");
    console.log(request.headers);
    if (path === '/') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write(`<!DOCTYPE html>
   <head>
      <link rel="stylesheet" href="/x">
   </head>
   <body>
      <h1>这是Node.js的http模板，代码在知乎文章内可以看到，别忘记刷新Node.js server</h1>
      <script src="/y"></script>
  </body>`);
        response.end();
    } else if (path === '/x') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/css;charset=utf-8');
        response.write(`body{color: red;}`);
        response.end();
    } else if (path === '/y') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8'); /*javascript不能缩写*/
        response.write(`console.log('这是JavaScript内容，在console中查看我吧')`);
        response.end();


    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write(`你访问的页面不存在`);
        response.end();
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n http://localhost:' + port)