# morgan-body

## overview

> TODO: description

### feature

- 支持 ts
- 记录请求体、回馈体
- 支持 stdout/file
- 可执行多个实例

## install

`npm i morgan-body`

## usage

不同于 express 的中间件用法

```js
let morganBody = require('morgan-body')
let bodyParser = require('body-parser')
// ...
let app = express()
// ...
app.use(bodyParser.json())
// ...
morganBody(app)
```

```
morganBody(app, {
    noColors: true,
    stream: fs.createWriteStream(
        path.join(__dirname, 'logs', 'access.log'), {flags: 'a'}
    )
})
```

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

`morganBody(app: Express, options: object) => void`

<!-- prettier-ignore-start -->
|options key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|noColors|是否使用颜色|B|false|||||
|maxBodyLength|一次日志中的请求体或回馈体的最大值|N|1000|||||
|prettify|是否格式化请求、回馈|B|true|||||
|includeNewLine|新旧记录之间是否间隔空行|B|true|||||
|logReqDateTime|是否记录请求时间|B|true|||||
|dateTimeFormat|时间格式|S|'utc'|'edt'/'clf'/'iso'/'utc'||||
|timezone|时区|S|服务所在的时间|||||
|logReqUserAgent|是否记录userAgent|B|true|||||
|logRequestBody|是否记录请求体|B|true|||||
|logReqHeaderList|设置记录的请求头字段|-|true|||||
|logAllReqHeader|是否记录请求头|B|true|||||
|logResponseBody|是否记录回馈体|B|true|||||
|logRequestId|是否以req.id开头本次记录|B|true|||||
|logIP|是否记录ip|B|true|||||
|logResHeaderList|列出记录的回馈头|-|true|||||
|logAllResHeader|是否记录回馈头|B|true|||||
|skip|当方法返回true时记录|function|null||`(req, res) = > true`|||
|stream|用于stdout的流|-|null|||||
|theme|日志中高亮的颜色主题|S|'defaultTheme'|'defaultTheme'/'dracula'/'usa'/'inverted'/'darkened'/'lightened'/'dimmend'||||
|filterParameters|指定不记录的字段|`S[]`|`[]`||`['password', 'credit']`|||
|immediateReqLog|是否在收到请求时记录，反之在回馈后记录|B|true|||||
<!-- prettier-ignore-end -->

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
