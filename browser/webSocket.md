# websocket

> 双工通信
> 建立在 tcp 协议上。
> 没有同源的限制。
> ws 协议 wss 协议

## 使用场景

- 客户端定时更新数据
- 长转询

## 传递的数据类型

- USVString
- ArrayBuffer
- Blob
- ArrayBufferView

## 协议

请求头

```
GET / HTTP/1.1                  使用了get方式
Host: localhost:8080
Origin: http://127.0.0.1:3000
Connection: Upgrade             需要升级
Upgrade: websocket              升级为websocket
Sec-WebSocket-Version: 13       使用的websocket版本。如果服务端不支持此版本，则回馈头中用Sec-WebSocket-Version表示服务端支持的版本。
Sec-WebSocket-Key: w4v7O6xFTi36lq3RNcgctw==
```

ws 协议是基于 http 协议升级的。ws 协议仍使用了 http 中的字段，如：host/cookie/origin。正常运行三握四挥。

## api

它的原型是 EventTarget。所有可以使用 addEventListener()方法监听的事件：（open, message, error, close）。

```js
// 构造函数
let ws = new WebSocket(url)
// 属性
ws.binaryType // 连接使用的二进制数据类型。可以用于指定收到的消息的数据类型
// "blob" | "arraybuffer" | "text"
ws.bufferedAmount // 队列中的字节数
ws.extensions // 服务器选择的扩展
ws.protocol // 服务器选择的子协议
ws.readyState // 当前连接的状态
// 0: 表示连接正在建立 CONNECTING
// 1: 表示连接功能    OPEN
// 2: 表示连接下在关闭 CLOSING
// 3: 表示连接已经关闭 CLOSED
ws.url // 连接的绝对url
// 方法
ws.close([code, [reason]]) // 断开
// code 关闭的原因。
// reason 关闭的原因。
ws.send() // 发送数据
// 事件
// 可以使用addEventListener() 添加事件监听器。
ws.close // 关闭时触发
ws.error //
ws.open //
ws.message //
```

## websocket & ws & socket.io & express-ws

|     | websocket  | ws              | socket.io        | express-ws                                       |
| --- | ---------- | --------------- | ---------------- | ------------------------------------------------ |
|     | 浏览器自带 | 一个 node.js 包 | 封装了 websocket |                                                  |
|     |            |                 |                  | 不需要单独监听一个端口。使用框架启动的端口即可。 |
|     |            |                 |                  |                                                  |
|     |            |                 |                  |                                                  |

## close 状态码列表

使用 CloseEvent.code 访问

| 状态码    | 名称                 | 描述                                                                                               |     |
| --------- | -------------------- | -------------------------------------------------------------------------------------------------- | --- |
| 0-999     |                      | 保留字段。未使用。                                                                                 |     |
| 1000      | CLOSE_NORMAL         | 正常关闭；无论为何目的而创建，该链接都已成功完成任务。                                             |     |
| 1001      | CLOSE_GOING_AWAY     | 终端离开，可能因为服务端错误，也可能因为浏览器正从打开连接的页面跳转离开。                         |     |
| 1002      | CLOSE_PROTOCOL_ERROR | 由于协议错误而中断连接。                                                                           |     |
| 1003      | CLOSE_UNSUPPORTED    | 由于接收到不允许的数据类型而断开连接 (如仅接收文本数据的终端接收到了二进制数据).                   |     |
| 1004      |                      | 保留。 其意义可能会在未来定义。                                                                    |     |
| 1005      | CLOSE_NO_STATUS      | 保留。表示没有收到预期的状态码。                                                                   |     |
| 1006      | CLOSE_ABNORMAL       | 保留。用于期望收到状态码时连接非正常关闭 (也就是说，没有发送关闭帧).                               |     |
| 1007      | Unsupported Data     | 由于收到了格式不符的数据而断开连接 (如文本消息中包含了非 UTF-8 数据).                              |     |
| 1008      | Policy Violation     | 由于收到不符合约定的数据而断开连接。这是一个通用状态码，用于不适合使用 1003 和 1009 状态码的场景。 |     |
| 1009      | CLOSE_TOO_LARGE      | 由于收到过大的数据帧而断开连接。                                                                   |     |
| 1010      | Missing Extension    | 客户端期望服务器商定一个或多个拓展，但服务器没有处理，因此客户端断开连接。                         |     |
| 1011      | Internal Error       | 客户端由于遇到没有预料的情况阻止其完成请求，因此服务端断开连接。                                   |     |
| 1012      | Service Restart      | 服务器由于重启而断开连接。                                                                         |     |
| 1013      | Try Again Later      | 服务器由于临时原因断开连接，如服务器过载因此断开一部分客户端连接。                                 |     |
| 1014      |                      | 由 WebSocket 标准保留以便未来使用。                                                                |     |
| 1015      | TLS Handshake        | 保留。 表示连接由于无法完成 TLS 握手而关闭 (例如无法验证服务器证书).                               |     |
| 1016-1999 |                      | 由 WebSocket 标准保留以便未来使用。                                                                |     |
| 2000-2999 |                      | 由 WebSocket 拓展保留使用。                                                                        |     |
| 3000-3999 |                      | 可以由库或框架使用.? 不应由应用使用。可以在 IANA 注册，先到先得。                                  |     |
| 4000-4999 |                      | 可以由应用使用。                                                                                   |     |

CloseEvent.reason string 关闭的原因
CloseEvent.wasClean boolean 连接是否关闭

## demo

### server

express 框架

```js
// <root>/bin/www 文件
let WebSocket = require('ws')
let wss = new WebSocket.Server({ port: 8080 })
wss.on('connection', (ws) => {
  clog('linked wss')
  ws.on('message', (msg) => {
    clog('message', msg)
    ws.send(
      JSON.stringify({
        msg,
      })
    )
  })
  ws.on('close', (...p) => {
    clog('close', p)
  })
  // ws.send('hi')
})
// 其他代码是express框架的代码。
// express服务监听3000端口
// websocket服务监听8080端口
```

### client

```js
let socket = new WebSocket('ws://localhost:8080')
socket.addEventListener('open', (event) => {
  clog('open', event)
  socket.send('hello')
})
socket.addEventListener('error', (event) => {
  clog('error', event)
  // socket.send('hello');
})
socket.addEventListener('message', (event) => {
  clog('message', event)
})
socket.addEventListener('close', (event) => {
  clog('close', event)
})
```

## [ws 包的官网](https://github.com/websockets/ws/blob/HEAD/doc/ws.md)
