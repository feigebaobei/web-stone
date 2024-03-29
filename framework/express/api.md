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
|app.locals|在该对象上设置属性可以在res.render时使用。|||||||
|app.mountpath|得当前（子）应用的挂载路径|||||||
|app.on('mount', cb(parent))|当挂载时触发，cb的参数是父应用|||||||
|app.all(path, cb, [cb, ...])|||||`app.all(*, requireAuthentication, loadUser)`|||
|app.delete(path, cb [, cb, ...])|当使用delete方式请求时触发|||||||
|app.disable(name)|设置app指定属性为false。|||||||
|app.disabled(name)||||||||
|app.enable(name)||||||||
|app.enabled(name)||||||||
|app.engine(ext, cb)|设置模板引擎|||||||
|app.get(name)|得到app的属性|||||||
|app.get(path, cb [, cb ...])|当使用get方式请求时触发|||||||
|app.listen(path, [cb])||||||||
|`app.listen([port[, host[, backlog]]][, cb])`|监听端口、服务|||||||
|app.METHOD(path, cb [, cb ...])||||||||
|app.param([name], cb)|不会|||||||
|app.path()|返回（子）应用的挂载路径|||||||
|app.post(path, cb [, cb ...])||||||||
|app.put(paht, cb [, cb ...||||||||
|app.render(view, [locals], cb)||||||||
||locals|是为模板文件提供变量数据的|||||||
||cb|function (err, html) {}|||||||
|app.route(path)|返回一个router对象||||app.route('/path').all(cb).get(cb).post(cb)|||
|app.set(name, value)||||||||
|app.use([path,] cb [, cb ...])|当匹配path时执行cb|||||||
<!-- prettier-ignore-end -->

# Request

request 请求对象

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|req.app|返回当前应用的引用|||||||
|req.baseUrl|返回当前路由挂载的路径|||||||
|req.body||||||||
|req.cookies||||||使用cookie-parser||
|req.fresh|不会|||||||
|req.hostname||||||||
|req.ip||||||||
|req.ips||||||||
|req.method|请求方式。都是大写。|||||||
|req.originalUrl|请求的链接|||||||
|req.params|根据动态参数得到值|||||||
|req.path||||||||
|req.protocol||||||||
|req.query||||||||
|req.res|返回当前请求相关的response对象|||||||
|req.route|返回与请求配置的路由|||||||
|req.secure||||||||
|req.signedCookies|被cookie-parser签名的cookie值|||||||
|req.stale|是否旧|||||||
|req.subdomains|返回子级域名组成的数组|||||||
|req.xhr|header是否包含`X-Requested-With`字段|||||||
|req.accepts(types)||||||||
|req.acceptsCharsets(charset[, ...])||||||||
|req.acceptsEncoding(encodeing[, ...])||||||||
|req.acceptsLanguages(lang [, ...])||||||||
|req.get(field)||||||||
|req.is(type)||||||||
|req.param(name, [defaultvalue])||||||||
|req.range(size[, options])||||||||
<!-- prettier-ignore-end -->

# Response

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|res.app||||||||
|res.headersSent|是否已经发送回馈|||||||
|res.locals|得到 app.locals 设置的数据|||||||
|res.append(field [, value])|追加或创建header中的字段、值|||||||
|res.attachement([filename])|不会|||||||
|res.cookie(name, value [, options])|设置cookie的name和value|||||||
||domain||String|||||
||encode||Function|||||
||expires||Date|||||
||httpOnly||Boolean|||||
||maxAge||Number|||||
||path||String|||||
||priority||String|||||
||secure||Boolean|||||
||signed||Boolean|||||
||sameSite||Boolean/String|||||
|res.clearCookis(name [, optins])|删除指定的cookie|||||||
|res.download(path [, filename] [, options] [, fn])|设置下载的文件|||||||
||maxAge||0|||||
||root|||||||
||lastModified||Enabled|||||
||headers|||||||
||dotfiles||'ignore'|||||
||acceptRanges||true|||||
||cacheControl||true|||||
||immutable|||||||
|res.end([data] [, encoding])|强制结构Response对象的链式操作|||||||
|res.format(object)||||||||
|res.get(field)||||||||
|res.json([body])||||||||
|res.jsonp([body])||||||||
|res.links(links)|在回馈头中设置link字段|||||||
|res.location(path)||||||||
|res.redirect([status,] path)||||||||
|res.render(view [, locals] [, cb])||||||||
|res.req()||||||||
|res.send([body])||||||||
|res.sendFile(path [, options] [, fn])||||||||
||maxAge|||||||
||root|||||||
||lastModified|||||||
||headers|||||||
||dotfiles|||||||
||acceptRanges|||||||
||cacheControl|||||||
|res.sendStatus(statucCode)|设置code码值|||||||
|res.set(field [, value])|设置回馈头的字段、值|||||||
|res.status(code)|是res.sendStatus(statusCode)的别名|||||||
|res.type(type)||||||||
|res.vary(field)||||||||
<!-- prettier-ignore-end -->

# Router

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|router.all(path, [cb, ...] cb)||||||||
|router.METHOD(path, [cb, ...] cb)||||||||
|router.param(name, cb)|不会|||||||
|router.route(path)||||||||
|router.use([path], [function, ...] function)|绑定中间件|||||||
<!-- prettier-ignore-end -->
