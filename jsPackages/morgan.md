# morgan

## overview

> 用于 node.js 的日志中间件

### feature

- feature0
- feature1
- feature2

## install

`npm i morgan`

## usage

```js
const morgan = require('morgan')
morgan('tiny')
morgan(':method :url :status :res[content-length] - :response-time ms')
morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ')
})
```

### 预定义的 format

|          |                                                                                                                                     |     |     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- | --- | --- |
| combined | `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agnet"` |     |     |
| common   | `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]`                           |     |     |
| dev      | `:method :url :status :response-time ms - :res[content-length]`                                                                     |     |     |
| short    | `:remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-lenth] - :response-time ms`                         |     |     |
| tiny     | `:method :url :status :res[content-length] - :response-time ms`                                                                     |     |     |

### 创建新 token

```js
morgan.token('type', function (req, res) {
  return req.headers['content-type']
})
```

有了新 token 就可以在`morgan.token()`中使用了。
`morgan.token()`可以重写 token

### 预置的 token

|                          |                                               |     |                                                             |
| ------------------------ | --------------------------------------------- | --- | ----------------------------------------------------------- |
| `:date[format]`          | 指定时间格式                                  | clf | `log format ("10/Oct/2000:13:55:36 +0000")`                 |
|                          |                                               | iso | `ISO 8601 date time format (2000-10-10T13:55:36.000Z)`      |
|                          |                                               | web | `RFC 1123 date time format (Tue, 10 Oct 2000 13:55:36 GMT)` |
| `:http-version`          | http 的版本号                                 |     |                                                             |
| `:method`                | 请求方式                                      |     |                                                             |
| `:referrer`              | 请求头中的 referrer 字段                      |     |                                                             |
| `:remote-addr`           | 请求来源：req.ip/req.connection.remoteAddress |     |                                                             |
| `:remote-user`           | -不会                                         |     |                                                             |
| `:req[header]`           | 使用指定的 header 字段，若不存在则使用`-`     |     |                                                             |
| `:res[headher]`          | 使用指定的回馈头，若不存在 则使用`-`          |     |                                                             |
| `:response-tiem[digits]` | 从收到请求到写好回馈头所用时长，ms.           |     |                                                             |
| `:status`                | 回馈状态                                      |     |                                                             |
| `:total-time[digits]`    | 从收到请求到发送完回馈所用时长，ms.           |     |                                                             |
| `:url`                   | 优先使用 req.originalUrl,其次使用 req.url     |     |                                                             |
| `:user-agent`            | 请求头中的 user-agent 字段                    |     |                                                             |

|`:status`|请求方式|||
|`:status`|请求方式|||

### 写入日志文件

```js
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
})
app.use(morgan('dev', { stream: accessLogStream }))

let rfs = require('rotating-file-stream')
let accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log'),
})
```

### title

|||||
|combined||||
|combined||||
|combined||||

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`morgan.fn(param, first: string, second: boolean = true) => void`
description

`morgan.fn(param, [options: {a: string, b?: number}])`
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
