# express 4.*

npm start // 启动 不是node app.js

npm i -g express-generator

express myapp
cd myapp
npm i
npm start

# 原理

express的这个中间件架构就是负责管理与调用这些注册的中间件。中间件顺序执行，通过next来继续下一个，一旦没有继续next，则流程结束。

下面是一个简单实现方案：
```
// 数组
var tasks = [
    function A(){
        //...
        next();
    },
    function B(){
        //...
        next()
    },
    function C(){
        //...
        next()
    }
    //...
];
function next(err, result){
    if(err) throw err;
    var currentTask = tasks.shift();
    if(currentTask) currentTask(result)
    next();
}
// 首次主动调用
next();
```

## express底层：http模块

Express框架建立在node.js内置的http模块上。http模块生成服务器的原始代码如下。

```
var http = require("http");
var app = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello world!");
});
app.listen(3000, "localhost");
```
```
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello world!');
});
app.listen(3000);
```
两者的回调函数都是相同的。Express框架等于在http模块之上，加了一个中间层。

## 中间件

中间件的源头在express实例。
每个中间件一般会接收三个参数：1. request // http请求。 2. response // http回馈。 3. next // 下一个中间件的回调方法。
若有4个参数，则第一个是error // 上一个中间件报来的错误。也就是next方法带来有参数。其它参数顺延。
从这名话中也能明白express是基于node的http模块的。

```
// 写一个什么也不做的中间件
function middleware (req, res, next) {
  next()
}
```

next就是下一个中间件。
若不调用next方法，则不会执行下一个中间件。

1. 中间件一般不直接对客户端进行响应，而是对请求进行一些预处理，再传递下去；
2. 中间件一般会在路由处理之前执行

## use方法

注册中间件。
只要请求路径匹配，就会将执行当前中间件。同一路由有可能触发多个中间件。

# 网络模块（就是http模块）

# 文件模块

```
const fs = require('fs')
fs.readFile(filename[, option], cb)
fs.writeFile(filenaem, data[, options], cb)
fs.mkdir(path[, mode], cb)
fs.readdir(path, cb) // 读目录
fs.unlink(filename, cb) // 删除文件
fs.rmdir(path, cb) // 删除空目录
```


# title
# title
# title
