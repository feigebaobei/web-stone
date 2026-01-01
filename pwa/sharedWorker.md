# SharedWorker

> SharedWorker 是一个多线程的 Web Worker，它可以被多个页面共享。
> 在同源策略下多个页面可以连接同一个共享的 Worker。
> 其生命周期独立于页面。即使所有关联的页面都关闭了，Worker 线程也不会停止。在所有页面关闭时，Worker 线程会收到一个关闭事件。
> 支持同域下多个页面通信。因它们可以共享一个 Worker。
> 使用场景
> 多标签页面的状态同步。如同一个用户在多个标签页下登录后在其他标签页自动更新。
> 实时协作工具。如文档编辑器，多个用户同时编辑同一个文档。
> 交易系统。当一个页面在发生交易时，其他页面可以实时更新。
> 没有 close 事件
> 相关页面关闭时自动断开连接。
> 当前设备上所有相关页面都断开连接时，SharedWorker 也会更新。

## 调试

`chrome://inspect/#workers`

## api

```js
// 构造函数
new SharedWorker(url) // 同域的url
new SharedWorker(url, name?)
new SharedWorker(url, options?: {
    type?: 'classic' | 'module' // default: 'classic'
    credentials?: 'include' | 'omit' | 'same-origin', // default: 'omit'
    name?: string,
    sameSiteCookies: 'all' | 'none' //
})

// 事件
onconnect
实例化时触发

onerror
onmessage
onmessageerror

// 方法
start() // 必须执行此方法才能执行postMessage(). onmessage()稳式调用了start方法。
// 使用 addEventListener 时所需。否则由 onmessage 设置器隐式调用。
// port.postMessage(message, transfer?) //

postMessage(message, transfer?)

// 属性
```

## demo todo

sharedWorker.js

```js
let clog = console.log
let portMap = new Map()
let setPortMap = (port) => {
  portMap.set(port, Symbol())
}
let deletePortMap = (port) => {
  portMap.delete(port)
}

onconnect = function (event) {
  const port = event.ports[0]
  setPortMap(port)
  let f = function (e) {
    switch (e.data.type) {
      case 'close':
        port.removeEventListener('message', f)
        deletePortMap(port)
        break
      case 'message':
      default:
        portMap.keys().forEach((portItem) => {
          if (portItem !== port) {
            portItem.postMessage(e.data.payload)
          }
        })
        break
    }
  }
  //   port.onmessage = f
  port.addEventListener('message', f)
  port.start()
}
```

page.js

```js
let clog = console.log
let sharedWorker = new SharedWorker('./sharedWorker.js')

sharedWorker.port.start()
sharedWorker.port.addEventListener('message', (e) => {
  clog('sharedWorker.port.onmessage', e.data)
})
sharedWorker.port.postMessage({ payload: [2, 3], type: 'message' })

window.addEventListener('beforeunload', () => {
  sharedWorker.port.postMessage({ type: 'close' })
})
```

**在多个浏览器 tab 页面中打开同一个发消息的页面，则这些页面都会发消息。**
在连接时没有找到标记 port 惟一的字段。
