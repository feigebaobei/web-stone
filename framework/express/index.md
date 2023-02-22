# express

## overview

> node.js 的框架  
> 遵守 commonjs 规范  
> 它是我见过的最简单的框架  
> 使用 pipe 方式处理问题  
> 所有工作都由中间件完成

### feature

- 强大的路由
- 关注高性能
- 很高的测试覆盖率
- http 友好
- 支持 14+个模板引擎
- 内容协商 https://www.cnblogs.com/supersnowyao/p/8593828.html
- 启动快

## install

```shell
npm i express -g
# 一般还需要
# npm i -g express-generator
```

## usage

创建项目

```shell
# const express = require('express');
express myapp
cd myapp
npm i
npm start
```

启动项目

```js
let express = require('express')
let app = express()
app.get('/', (req, res) => {
  res.send('string')
})
app.listen(3000)
```

### 路由

```js
app.METHOD(PATH, HANDLER) // 为指定请求方式设置控制器
app.all(path, handler) // 为指定路由设置所有请求方式的控制器
// handler的功能像中间件。
express.Router() // 返回一个路由中间件
// app.use(middleWare) // 使用一个中间件
```

### 静态文件

`express.static(root, [options])`

```
app.use(express.static('static', './public'))
```

## 中间件

功能：

- 执行任意代码
- 改变 requeset/respone
- 结束 req-res 环
- 调用栈中下一个中间件

```js
let express = require('express')
let app = express()
app.get('/path', (req, res, next) => {
  // ...
  next()
})
app.listen(3000)
```

按使用地方不同，可分为：
|||||
|-|-|-|-|
|应用级中间件|`app.use(middleWare)`|||
|路由级中间件|`router.use(middleWare)`|`let router = express.Router()`||
|控制错误中间件|`app.use(middleWare)`|||
|内置中间件|`express.static / express.json / express.urlencoded`|||
|三方中间件|`app.use(middleWare)`|先安装，再使用。||
|应用级中间件|`app.use(middleWare)`|||

中间件的写法

```js
module.exports function (err, req, res, next) {
  // 遵守错误优先
  // ...
  next()
}
```

## 覆盖 express api

|                         |                  |     |     |
| ----------------------- | ---------------- | --- | --- |
| 修改 express 的全局属性 | express.request  |     |     |
| 修改 express 的全局属性 | express.response |     |     |
| 修改指定应用的属性      | app.response     |     |     |
| 修改指定应用的属性      | app.response     |     |     |

```js
// 重写方法
app.response.sendStatus = (statusCode, type, message) => {
  return this.contentType(type).status(statusCode).send(message)
}
// 重写属性
Object.defineProperty(app.request, 'ip', {
  configrable: true,
  enumberable: true,
  get() {
    return this.get('Client-IP')
  },
})
// req的原型对象设置原型对象
Object.setPrototype(Object.getPrototype(app.request), xxx)
```

## 结合模板引擎

```shell
npm i pug --save
```

```js
app.set('views', './views') // 设置模板文件目录
app.set('view engine', 'pug') // 设置模板引擎
app.get('/path', (req, res) => {
  res.render('index', {
    title: 'hey',
    message: 'hi',
  })
})
```

## 连接数据库

-

## title

## title

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|app.METHOD(PATH, HANDLER)||||||||
|`express.static(root, [options])`||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

`express.fn(param, first: string, second: boolean = true) => void`
description

`express.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。

# express 4.\*

npm start // 启动 不是 node app.js

npm i -g express-generator

express myapp
cd myapp
npm i
npm start

# 原理

express 的这个中间件架构就是负责管理与调用这些注册的中间件。中间件顺序执行，通过 next 来继续下一个，一旦没有继续 next，则流程结束。

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

## express 底层：http 模块

Express 框架建立在 node.js 内置的 http 模块上。http 模块生成服务器的原始代码如下。

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

两者的回调函数都是相同的。Express 框架等于在 http 模块之上，加了一个中间层。

## 中间件

中间件的源头在 express 实例。
每个中间件一般会接收三个参数：1. request // http 请求。 2. response // http 回馈。 3. next // 下一个中间件的回调方法。
若有 4 个参数，则第一个是 error // 上一个中间件报来的错误。也就是 next 方法带来有参数。其它参数顺延。
从这名话中也能明白 express 是基于 node 的 http 模块的。

```
// 写一个什么也不做的中间件
function middleware (req, res, next) {
  next()
}
```

next 就是下一个中间件。
若不调用 next 方法，则不会执行下一个中间件。

1. 中间件一般不直接对客户端进行响应，而是对请求进行一些预处理，再传递下去；
2. 中间件一般会在路由处理之前执行

## use 方法

注册中间件。
只要请求路径匹配，就会将执行当前中间件。同一路由有可能触发多个中间件。

# 网络模块（就是 http 模块）

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
