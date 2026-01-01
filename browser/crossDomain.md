# 跨域

## 定义

> 协议、域名、端口号，三者中只要有一个不同，就会跨域。
> 只在浏览器中发生。服务器之间不会跨域。

## 解决方案

推荐使用 cors 方案

### cors

cross-origin resource sharing

```js
// 前端正常请求
// 后端设置回馈头
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
res.setHeader('Access-Control-Allow-Credentials', true)
```

[front&end](/confuse/front&end.html)

### [postMessage](/language/javascript/postMessage.html)

### jsonp

原理：利用`<script>`标签没有跨域限制。

具体操作：

1. 在 script 标签的 src 属性中添加一个 callback 参数。（也可以是别的参数名。要求上下文一致。）这是 get 请求。
2. 在客户端定义一个 callback 值的函数。
3. 服务端在 no.1 中解析出 callback 值。并拼凑出调用此函数的 js 代码。

> 前端定义好一个 cb 方法。
> 让后端给一个调用 cb 方法的 js 代码。要求给 cb 喂入参数。

不足：只能发送 get 请求=

```js
// 纯js
var script = document.createElement('script')
script.type = 'text/javascript'
// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
script.src =
  'http://www.domain2.com:8080/login?user=admin&callback=handleCallback'
document.head.appendChild(script)
// 回调执行函数
function handleCallback(res) {
  alert(JSON.stringify(res))
}

// server
router.get('/xxx', (req, res) => {
  let fn = xxx.callback // 这是字符串
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
  res.write(`fn(${params})`)
})
```

### window.name + iframe

```js
var proxy = function (url, callback) {
  var state = 0
  var iframe = document.createElement('iframe')

  // 加载跨域页面
  iframe.src = url

  // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
  iframe.onload = function () {
    if (state === 1) {
      // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
      callback(iframe.contentWindow.name)
      destoryFrame()
    } else if (state === 0) {
      // 第1次onload(跨域页)成功后，切换到同域代理页面
      iframe.contentWindow.location = 'http://www.domain1.com/proxy.html'
      state = 1
    }
  }

  document.body.appendChild(iframe)

  // 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）
  function destoryFrame() {
    iframe.contentWindow.document.write('')
    iframe.contentWindow.close()
    document.body.removeChild(iframe)
  }
}

// 请求跨域b页面数据
proxy('http://www.domain2.com/b.html', function (data) {
  alert(data)
})
```

```js
window.name = 'xxxx'
```

### location.hash + iframe

只适用于同域。

```js
// 父页面
iframe.src = 'xxx.html#k=v' // 改变子页面的hash
function cb(params) {...}
```

```js
// 子页面
window.onhashchange = function () {
  let params = 'xxx'
  window.parent.cb(params) // 调用父页面在方法
}
```

### document.domain + iframe

只适用于主域相同的 2 个窗口。
两个页面都通过 js 强制设置 document.domain 为基础主域，就实现了同域。

```js
// 父窗口
document.domain = 'xxx.com'
var user = 'xxx'
```

```js
// 子窗口
document.domain = 'xxx.com'
window.parent.user // 访问user变量
```

### nginx

- 设置回馈头，同 cors.
- 同域时，不操作。
- 反向代理。

```
server {
    listen 80;
    server_name example.com;
    location / {
        proxy_pass http://127.0.0.1:8080;
        index index.html;
        proxy_cookie_domain example.com;
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Credentials true;
        add_header Access-Control-Allow-Headers "X-Requested-With,Content-Type,Accept,Origin,Authorization";
        add_header Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT";
    }
}
```

### WebSocket

原生 websocket api。
socket.io 封闭了 websocket api。

```js
<script src="https://cdn.bootcss.com/socket.io/2.2.0/socket.io.js"></script>
<script>
var socket = io('http://www.domain2.com:8080');
socket.on('connect', function() {
    // 监听服务端发送的消息
    socket.on('message', function (msg) {
        ...
    });
    // 监听服务端关闭
    socket.on('disconnect', function () {})
})
socket.send(xxx) // 发送消息给服务端
```

```js
let socket = require('socket.io')
socket.listen(server).on('connection', function (client) {
  // 监听客户端发送的消息
  client.on('message', function (data) {})
  // 断开处理
  client.on('disconnect', function (data) {})
})
```

### 中间件代理跨域

node + vue + webpack + webpack-dev-server

```js
// webpack.config.js
module.exports = {
    entry: "./src/index.js",
    moudles: {},
    ...
    devServer: {
        proxy: [{
            context: '/api',
            target: 'http://localhost:8080', // 代理目标地址
            changeOrigin: true,
            secure: false,
            cookieDomainRewrite: 'localhost'
        }]
    }
}
```

node + express + http-proxy-middleware

```js
let proxy = require('http-proxy-middleware')
route.use(
  '/',
  proxy({
    target: 'http://localhost:8080',
    changeOrigin: true,
    onProxyReq: function (proxyReq, req, res, options) {
      res.headers['Access-Control-Allow-origin'] = '*'
      res.headers['Access-Control-Allow-Credentials'] = '....'
      res.headers['Access-Control-Allow-Methods'] = '....'
      res.headers['Access-Control-Allow-headers'] = '....'
    },
  })
)
```

### 代理服务器

同 nginx
