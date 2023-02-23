# express()

```js
let express = require('express')
let app = express() // 返回一个应用。不是实例。
```

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|express.json([options])|解析request为json|||||基于`body-parser`|内置中间件|
||inflate||boolean|true||||
||limit||Mixed|'100kb'||||
||reviver||Function|null||||
||strict||Boolean|true||||
||type||Mixed|"application/json"||使用`type-is`||
||verify||Function|undefined||||
|express.raw([options])|解析request为buffer||||||内置中间件|
||inflate||Boolean|true||||
||limit||Mixed|'100kb'||||
||type||Mixed|'application/octet-stream'||||
||verify||Function|undefined||||
|express.Router([options])|创建一个router对象|||||||
||caseSensitive|||||||
||mergeParams|||false||||
||strict|||||||
|express.static(root, [options])||||||基于`serve-static`|内置中间件|
||dotfiles||String|'ignore'||||
||etag||Boolean|true||||
||extensions||Boolean|false||||
||fallthrough||Boolean|true||||
||immutable||Boolean|false||||
||index||Mixed|'index.html'||||
||lastModified||Boolean|true||||
||maxAge||Number|0||||
||redirect||Boolean|true||||
||setHeaders||Function|||||
|express.text([options])|解析request为string|||||基于`body-parser`|内置中间件|
||defaultCharset||String|'utf-8'||||
||inflate||Boolean|undefined||||
||limit||Mixed|'100kb'||||
||type||Mixed|'text/plain'||||
||verify||Function|undefined||||
|express.urlencoded([options])|使用urlencoded解析req||||||内置中间件|
||extended||Boolean|true||||
||inflate||Boolean|true||||
||limit||Mixed|'100kb'||||
||parameterLimit||Number|1000||||
||type||Mixed|'application/x-www-form-urlencoded'||||
||verify||Function|undefined||||
<!-- prettier-ignore-end -->

# Application

```js
let app = require('express')() // 返回一个应用
```

<!-- prettier-ignore-start -->
|properties|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|app.locals||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

# Request

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

# Response

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

# Router

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

# Router 对象
