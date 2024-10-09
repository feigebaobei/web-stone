# postMessage

> html5 引入的 api.
> 允许不同源脚本采用异步方式通信。
> 可以跨文档、窗口、跨域。
> window.postMessage()

## api

`window.postMessage(message, targetOrigin, [transfer: boolean])`
message: 要发送到其它窗口的数据。被结构克隆算法序列化。
targetOrigin: 指定哪些窗口可接收消息。 \* 任意窗口
/ 同源窗口
transfer 是否转移数据的所有权

```js
window.addEventListener('message', receiveMessage, false)
function receiveMessage(event) {
    let origin = event.origin
    ....
    // event: {
    //     data: 发送来的数据
    //     type: 消息的类型
    //     source: 发消息的窗口对象
    //     origin: 发消息的窗口的源
    // }
}
```

## 用例

- 跨域请求数据
- webWorker
- serviceWorker
