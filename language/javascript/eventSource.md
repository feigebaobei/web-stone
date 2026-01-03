# EventSource

> web 内容与服务器发送事件通信的接口。
> 一个 EventSourcer 实例会对 http 服务器开启一个持久化的连接。直到使用`EventSource.close()`关闭。以`text/event-stream`格式发送事件。
> 由客户端发起，建立一个客户端与服务端的持久的连接。然后由服务器向客户端发送事件。
> 客户端调用 close 方法，然后服务端接收到 close 事件。
> 服务端接收到 close 事件后服务端关闭链接。
> 像是建立一次连接多次传递数据。
> 由服务端发送数据。断开链接
> 当客户端断开链接后，服务端会断开链接。
> 浏览器对断开的连接有内置的自动重连机制。（当非主动断开时，浏览器会自动重连。）
> 长连接，可以减小频繁请求开销。
> 只适用于传递文本。
> 支持自定义事件。
> 当不指定 event 时，默认为`message`  
> 最后一行必须是`\n\n`结尾。用它来分割消息。

## 数据结构

传输的是文本。
每行以`\n`结尾
最后一行以`\n\n`结尾

```
data   //
event  // 事件类型。默认为message
id     // 每条数据的惟一编号
retry  // 当时间间隔到期或网线连接错误时。指定浏览器重新发起连接的时间间隔。
```

### 服务端的回馈头

```
'Content-Type': 'text/event-stream',
'Cache-Control': 'no-cache',
'Connection': 'keep-alive'
```

## uml

```js
    client           server
    close()
```

## 使用场景：

- 社交媒体状态更新
- 新闻推送
- 推送消息
- 长任务更新进度

## 构造函数

EventSource 的原型是 EventTarget。所以可以使用 addEventListener()添加事件监听。

```js
let sse = new EventSource(url, configuration)
// 用于处理来自指定url的服务器发送事件。
configuration: {
  withCredentials: Boolean // default false
  // cors是否包含credentials
}
```

## 属性

|                 |      |          |                           |
| --------------- | ---- | -------- | ------------------------- |
| readyState      | 只读 |          |                           |
| url             | 只读 |          |                           |
| withCredentials | 只读 |          |                           |
| close()         |      | 关闭连接 | 设置 readyState 为 CLOSED |

## api

```js
EventSource(url, configuration)
// 用于处理来自指定url的服务器发送事件。

// 属性
readyState 连接状态
  0 链接中
  1 打开
  2 关闭

url 构建函数的url

withCredentials // boolean
// 是否可以使用cors cookie. 默认为false

// 方法
close() // 关闭连接

// 事件
error // 当事件源的连接未能打开时触发
message // 当事件源接收到消息时触发
open // 当事件源连接打开时触发
```

## 设置自定义事件

```
sse.addEventListener('notice', (e) => {
  clog('e', e)
})
```

## tips

这种写法不太好用。

```js
res.write('event: update\n')
res.write('data: {' + '\n') // data写成从行不太好用。因客户端不太好解析为对象。
res.write('data: k: 2' + '\n')
res.write('data: }' + '\n\n')
res.end()
```

这种写法好用

```js
res.write('event: update\n')
res.write(`data: ${JSON.stringify({ k: 2 })}\n\n`) // 这样客户端就好解析为对象了。
res.end()
```

## 服务端代码

```js
需要使用
res.write(xxx) // 写4行数据。
res.end()
发送数据
```

不要使用
res.send() // 表示 write 和 end
