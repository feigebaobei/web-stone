# overview
- js是单线程语言  
- js拥有的web worker可以利用运行js的宿主环境支持的多线程功能。
- worker可嵌套
- 主线程/worker线程必须在相同的origin中。
- 主线程/worker线程之间转换数据(Transferable Objects)  
- 有专用worker和共享worker  

# demo
```js
// 创建worker对象
let worker = new Worker('workerFile.js')
let value = {k: 'v'}
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
    // event: {

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

# worker支持的事件
- message  
- error  
- messageerror 当数据无法序列化为字符串时触发  

# worker api
|Worker||说明|返回值||
|-|-|-|-|-|
||new Worker(url, options?: {type, credentials, name})||worker对象||
|属性|||||
|方法|||||
||postMessage(data)|把数值转移给worker|||
||terminate()|停止指定的线程|||
|事件|||||
||onerror|当worker中出错是触发|||
||onmessage|当父线程传递过来信息时触发|event.data是传递来的数据||
||onmessageerror|当消息不能序列化时触发|||

# 原型
```
EventTarget <--- Worker
```

# MessageEvent
消息对象  
继承自Event对象  

|MessageEvent||||||
|-|-|-|-|-|-|
|属性||||||
||data|||||
||origin|||||
||lastEventId|||||
||source|代表消息发送者||||
||ports|MessagePort对象数组，表示消息下在通过特定通道传输。||||
|方法||||||

# 加载worker脚本
```html
<!-- type的值是浏览器不认识的值 -->
<script id="worker" type="app/worker">
    addEventListener('message', (e) => {
        postMessage('hi')
    }, false)
</script>
<script type="javascript/text">
let blob = new Blob([document.querySelector('#worker').textContent])
let url = window.URL.createObjjectURL(blob)
let worker = new Worker(url)
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

# worker中可以使用&不可以使用

||可以使用|不可以使用||
|-|-|-|-|
||navigator object|dom||
||location object(read-only)|window||
||importScriptes()|document||
||javascript object|parent||
||xhr|alert() / confirm()||
||setTimeout()/clearTimeout()/setInterval()/clearInterval()|||
|||||

# 共享worker
```js
let myWorker = new SharedWorker('worker.js')
myWorker.port.start() // work线程间需要通信时，需要调用start()方法。父线程调用
port.start() // 当前（子）线程调用
myWorker.port.postMessage(value)
```


# todo
## 为什么多个页面会共用一个worker呢？

## 专用worke & 共享worker
||专用worker|共享worker||||
|-|-|-|-|-|-|
||专用 worker 仅仅能被首次生成它的脚本使用|可以同时被多个脚本使用||||
||遵守同源策略|遵守同源策略||||
|判断是否支持|`window.Worker`|`window.SharedWorker`||||
|||必须使用端口对象进行通信||||
|||||||
|||||||

## title
## title
## title
## title
