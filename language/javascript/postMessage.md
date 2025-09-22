# postMessage

> html5 引入的 api.
> 允许不同源脚本采用异步方式通信。
> 可以跨文档、窗口、跨域。
> window.postMessage()

## api

`window.postMessage(message, targetOrigin, [transfer: boolean])`
message: 要发送到其它窗口的数据。被结构克隆算法序列化。
targetOrigin: 指定哪些源的窗口可接收消息。 \* 任意源的窗口
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
    //     origin: 发消息的窗口的源（协议+域名+端口）
    // }
}
```

## 不足

- 因传递的消息。所以只能传递字符串。如果传递对象、数组等数据，需要先 JSON.stringify()转换成字符串再传递。
- 性能开销大
- 不能拒绝指定源的接收消息。有可能在收到很多源的消息。不想收也不行。
- 为了安全需要先验证源再使用消息。
- 排查问题比较烦索。需要发送者与接收者都排查。

## 用例

- 跨域请求数据
- webWorker
- serviceWorker
