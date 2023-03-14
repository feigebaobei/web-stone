# cookie-parser

## overview

> 操作 cookie

### feature

- 解析 cookie 到 req.cookies/req.signedCookies
- 加密 cookie/解密 cookie.(原文中使用 sign/unsign)
- feature2

## install

`npm i cookie-parser`

## usage

```js
var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser())
app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})
app.listen(8080)
// curl command that sends an HTTP request with two cookies
// curl http://127.0.0.1:8080 --cookie "Cho=Kim;Greet=Hello"
```

|                      | cookie      | 加密 cookie                            |     |
| -------------------- | ----------- | -------------------------------------- | --- |
| 若使用 secret        | req.cookies | req.signedCookies                      |     |
|                      |             | 以`s:`开头。若签名验证失败，则为 false |     |
| 若支持'JSON cookies' |             |                                        |     |
|                      |             |                                        |     |
|                      |             |                                        |     |

若支持'JSON cookies'，则 cookie 的值以`j:`开头，其值是`JSON.parse()`的结果。

若使用 secret，则 req.cookies 是

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|`cookieParser(secret?: S | S[], options?)`|||若使用secret则签名。否则不签名。|||||||
||options: {decode}|decode|解码的自定义方法|||||||
|`cookieParser.JSONCookie(str) => json`|||返回解析后的json cookie|||||||
|`cookieParser.JSONCookies(cookies) => json`|||依次使用`JSONCookie`解析每一个key对应的值，再返回一个json对象。|||||||
|`cookieParser.signedCookie(str, secret: S | S[])`|||若str是签名的cookie，则返回解密后的cookie。若str不是签名的cookie，则返回str。若str是签名的cookie并无法解密，则返回false.|||||||
|`cookieParser.signedCookies(cookies, secret)`|||依次使用解密|||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`cookie-parser.fn(param, first: string, second: boolean = true) => void`
description

`cookie-parser.fn(param, [options: {a: string, b?: number}])`
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
