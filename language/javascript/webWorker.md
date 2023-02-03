# overview

- js 是单线程语言
- js 支持的 web worker 可以利用运行 js 的宿主环境支持的多线程功能。
- worker 可嵌套
- 主线程/worker 线程必须在相同的 origin 中。
- 主线程/worker 线程之间转换数据(Transferable Objects)
- 有专用 worker 和共享 worker

# demo

```js
// 1. 创建worker对象
// 2. 转移给worker数据
// 3. 接收worker给的消息
// 4. 关闭worker

// 创建worker对象
let worker = new Worker('workerFile.js')
let value = { k: 'v' }
worker.postMessage(value)
// or worker.addEventListener('message', (e) => {...}, false)
worker.onmessage = (event) => {
  console.log(event.data)
}
worker.terminate() // stop worker
// 出错
// worker.onerror(f)
```

```js
// workerFile.js
onmessage = function (event) {
    // event就是普通事件对象。
    // event: {
    //   data: xxx 从postMessage中转移来的数据
    //   ...
    // }
    let result = {k1: 'v1'}
    postMessage(result)
}
// or self.addEventListener('message', (e) => {...}, false)
self.close() // stop worker
// self是子线程
// worker中引入其他脚本
importScripts('filejs.js', ...) // 无返回值
// 出错
// self.addEventListener('error', f)
```

# worker 支持的事件

- message
- error
- messageerror 当数据无法序列化为字符串时触发

# worker api

| Worker |                                                      | 说明                       | 返回值                    |     |
| ------ | ---------------------------------------------------- | -------------------------- | ------------------------- | --- |
|        | new Worker(url, options?: {type, credentials, name}) |                            | worker 对象               |     |
| 属性   |                                                      |                            |                           |     |
| 方法   |                                                      |                            |                           |     |
|        | postMessage(data)                                    | 把数值转移给 worker        |                           |     |
|        | terminate()                                          | 停止指定的线程             |                           |     |
| 事件   |                                                      |                            |                           |     |
|        | onerror                                              | 当 worker 中出错是触发     |                           |     |
|        | onmessage                                            | 当父线程传递过来信息时触发 | event.data 是传递来的数据 |     |
|        | onmessageerror                                       | 当消息不能序列化时触发     |                           |     |

# 原型

```
EventTarget <--- Worker
```

# MessageEvent

消息对象  
继承自 Event 对象

| MessageEvent |             |                                                      |     |     |     |
| ------------ | ----------- | ---------------------------------------------------- | --- | --- | --- |
| 属性         |             |                                                      |     |     |     |
|              | data        |                                                      |     |     |     |
|              | origin      |                                                      |     |     |     |
|              | lastEventId |                                                      |     |     |     |
|              | source      | 代表消息发送者                                       |     |     |     |
|              | ports       | MessagePort 对象数组，表示消息下在通过特定通道传输。 |     |     |     |
| 方法         |             |                                                      |     |     |     |

# 加载 worker 脚本

```html
<!-- type的值是浏览器不认识的值 -->
<script id="worker" type="app/worker">
  addEventListener('message', (e) => {
      postMessage('hi')
  }, false)
</script>
<script type="javascript/text">
  let blob = new Blob([document.querySelector('#worker').textContent])
  let url = window.URL.createObjectURL(blob)
  let worker = new Worker(url)
  worker.postMessage({k: 0})
  worker.onmessage = (e) => {...}
</script>
```

```js
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() +')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}

var pollingWorker = createWorker(function (e) {
  var cache;

  function compare(new, old) { ... };

  setInterval(function () {
    fetch('/my-api-endpoint').then(function (res) {
      var data = res.json();

      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});

pollingWorker.onmessage = function () {
  // render data
}

pollingWorker.postMessage('init');
```

# worker 中可以使用&不可以使用

|     | 可以使用                                                  | 不可以使用          |     |
| --- | --------------------------------------------------------- | ------------------- | --- |
|     | navigator object                                          | dom                 |     |
|     | location object(read-only)                                | window              |     |
|     | importScriptes()                                          | document            |     |
|     | javascript object                                         | parent              |     |
|     | xhr                                                       | alert() / confirm() |     |
|     | setTimeout()/clearTimeout()/setInterval()/clearInterval() |                     |     |
|     |                                                           |                     |     |

# 共享 worker

```js
let myWorker = new SharedWorker('worker.js')
myWorker.port.start() // work线程间需要通信时，需要调用start()方法。父线程调用
port.start() // 当前（子）线程调用
myWorker.port.postMessage(value)
```

# todo

## 为什么多个页面会共用一个 worker 呢？

## 专用 worke & 共享 worker

|              | 专用 worker                              | 共享 worker                                           |     |     |     |
| ------------ | ---------------------------------------- | ----------------------------------------------------- | --- | --- | --- |
|              | 专用 worker 仅仅能被首次生成它的脚本使用 | 可以同时被多个脚本使用                                |     |     |     |
|              | 遵守同源策略                             | 遵守同源策略                                          |     |     |     |
| 判断是否支持 | `window.Worker`                          | `window.SharedWorker`                                 |     |     |     |
|              | `worker.postMessage(xx)`                 | 必须使用端口对象进行通信`worker.port.postMessage(xx)` |     |     |     |
