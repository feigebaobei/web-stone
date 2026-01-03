# MessageChannel

> 在 web worker 中可用
> 可以创建一个新的消息通道，并通过各自的 MessagePort 属性发送数据。
> 2 个 MessagePort 对象之间可以通信。1 vs 1 通信。

MessageChannel() 返回 2 个 MessagePort 对象。

MessageChannel.port1
MessageChannel.port2

```js
let { port1, port2 } = new MessageChannel()
port1.postMessage('hello')
port2.onmessage = (e) => {
  console.log(e.data)
}
port1.onmessage = (e) => {
  console.log(e.data)
}
```

# MessagePort

> 在 web worker 中可用。

## api

```js
postMessage(message: any, transferrables?: 是否转让所有权) // 给另一个MessagePort对象发消息。
postMessage(message: any, options?: {transfer}) // 给另一个MessagePort对象发消息。
start() // 不会
close() // 不会
```

# window.postMessage & messagePort.postMessage

<!-- prettier-ignore-start -->
|          | window.postMessage   | messagePort.postMessage       | worker.postMessage / sharedWorker.port.postMessage |||
| -------- | ---------------------------- | ----- |-|-|-|
|          | 1 vs n。              | 1 vs 1。        |1 vs 1| 1 vs 1||
|          | 每次通信都有同源检测。  | 在初始化通信时同源检测，之后都不检测。  ||||
|          | 可以收到所有的 window.onmessage 事件发来的消息。需要在 handler 中判断消息来源。 | 只能收到特定 messagePort 发来的消息。2个port在哪2个主体，就能使哪2个主体通信。|worker与父线程之间通信|worker与父线程之间通信||
|          | 一次性的消息          | 必需要先创建。  ||||
| 使用场景 | 发一次性的消息        | 2 个 MessagePort 之间双向通信（main page + web worker / iframe + iframe） ||||
|          |     | ||||
|          |     | ||||
<!-- prettier-ignore-end -->

# web worker & messageChannel

```js
// main.js
let worker1 = new Worker('worker1.js')
let worker2 = new Worker('worker2.js')
let ms = new MessageChannel()

// 把port1和port2分配给worker1和worker2
worker1.postMessage({ name: 'port', port: ms.port1 }, [ms.port1])
worker2.postMessage({ name: 'port', port: ms.port2 }, [ms.port2])

// worker1 & worker2分别接收port
worker1.onmessage = function (e) {
  if (e.data.name === 'port') {
    const port = e.data.port
    port.postMessage('hello') // 给另一个port发消息。
    port.onmessage = function (e) {
      // 接收来自另一个port的消息
      // e.data
    }
  }
}
```
