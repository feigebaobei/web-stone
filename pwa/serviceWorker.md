# service worker
> 本质上是web应用、浏览器与网络之间的代理服务器。
> 是一个注册在指定源和路径下的事件驱动worker
> 运行在worker上下文。不能操作dom。不会阻塞主线程。
> 它设计为完全异步，同步api(如xhr/localStorage)不能在service worker中使用
> 只能https承载。
> 在firefox浏览器的用户隐私模式下，service worker不可用。

## feature
1. [后台同步](https://wicg.github.io/background-sync/spec/)
2. [信息推送](https://developer.mozilla.org/zh-CN/docs/Web/API/Push_API)
   1. 可以实现后端后前端推送信息
   2. 需要一个被激活的service worker
   3. 可以使用`PushManager.subscribe()`方法订阅消息。

## usage
```js
```

### 使用条件
|||||||
|-|-|-|-|-|-|
|chrome||||||
|firefox||||||
|xxx||||||

## 生命周期
|||||
|-|-|-|-|
|1. 下载||由程序触发||
|2. 安装|由浏览器触发|||
|3. 激活|由浏览器触发|||

```
注册
    serviceWorkerContainer.register()
注册成功
    service worker在ServiceWorkerGlobalScope环境中运行。（其中无法访问dom）可接收事件
安装
    解决oninstall事件。
    常用于缓存资源
激活
    清理生前版本的service worker脚本中使用的资源
开始控制页面
```

```js
// app.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
        'url/path.js', // 相对于origin
        {scope: '/path/'} // 指定注册范围
    ) // 返回一个promise.其值是ServiceWrokerRegistration
    .then((reg) => {
        // ...
    })
    .catch((err) => {
        console.log('catch', err)
    })
}
window.addEventListener('install')
```
### 注册
### 安装
### 激活

## ServiceWorkerContainer   (navigator.serviceWorker)
为service worker提供一个容器般的功能。包括注册、卸载、更新service worker状态、访问service worker状态、访问他们的注册者。
`navigator.serviceWorker`就是ServiceWorkerContainer  

||||||
|-|-|-|-|-|
|属性|||||
||controller|当service worker状态为active时，返回ServiceWorkder对象。否则返回null|||
||ready|返回一个promise，当serviceworker为active状态时promise变为fulfilled状态。该promise永远不会变为rejected状态|||
||||||
||||||
||||||
|方法|||||
||register(scriptUrl[, {scope: USVString}])|返回一个ServiceWorkerRegistration（优先）。或返回一个值是ServiceWorkerRegistration的promise|scope指定service worker注册范围。相对于当前location||
||getRegistration()|根据当前网页的url返回一个ServiceWorkerRegistration或null|||
||getRegistrations()|返回所有ServiceWrokerRegistration或null|||
|事件|||||
||oncontrollerchange|当serviceworker变为active时触发|||
||onerror|当serviceworker中出现错误时触发|||
||onmessage|当ServiceWorkerContainer对象接收到一个message消息时触发。|message是MessagePort.postMessage()发出的||
||||||
||||||

## ServiceWorkerRegistration 对象
这是一个实验中的功能
它是注册了service worker的容器。

||||||
|-|-|-|-|-|
|属性|都是只读||||
||scope|返回相对于origin的范围|||
||installing|返回处于installing的service worker或null|||
||waiting|返回处于waiting的service worker或null|||
||active|返回处于activating / activated的service worker或null|||
||periodicSync|返回一个PeriodicSyncManager对象，该对象管理阶段性后台同步进程。|周期性执行任务。||
||pushManager|返回一个PushManager对象的引用。该对象可用于推送消息给订阅者。getting an active subscription, and accessing push permission status.|||
||sync|返回一个SyncManager对象的引用。该对象管理后台同步进程|||
||onupdatefound|-|||
|方法|||||
||getNotifications(options?: {tag: string})|返回一个值是Notification的promise|||
||showNotification(title, options?: {actions: [{action, title, icon}, ...], badge, body, data, dir, icon, image, lang, renotify, requireInteraction, silent, tag, timestamp, vibrate})|显示一个通知|||
||update(无参数)|当找到缓存时更新service worker的版本。返回一个值是ServiceWorkerRegistration的promise|||
||unregister()|注销个service worker，返回一个值是boolean的promise。boolean表示是否被注销。|||


## ServiceWorkerGlobalScope
代表一个service worker的全局变量。  
serviceworker中不能使用同步请求，可使用异步请求。




## api
ServiceWorkerContainer接口为service worker提供了一个容器般的功能。包括对service worker的注册、卸载、更新、和访问service worker的状态、 以及它们的注册者。  
navigator.serviceWorker就是实现了ServiceWorkerContainer接口  

|ServiceWorkerContainer||||||
|-|-|-|-|-|-|
|key|description|||||

|||||||
|-|-|-|-|-|-|
|key|description|||||

## uml

## todo
### [MessagePort]()
### 名称
工作线程。
### PeriodicSyncManager
### PushManager
### SyncManager
### Notification
### ServiceWorker
- 继承自[worker]()
- 这是一个实验中的功能  
- 它是服务工作者  

|||||||
|-|-|-|-|-|-|
|属性|都是只读|||||
||scriptUrl|脚本的url||||
||state|返回service worker的状态||||
|事件|全是小写|||||
||onstatechange|||||
||fetch|当控制范围内的页面有请求时触发||||
||push|||||
|方法|全部继承自worker|||||

```js
// serviceWorker.js
// demo0
// this.addEventListener('fetch', (e) => {
// or
self.addEventListener('fetch', (e) => {
    // 劫持http响应
    e.respondWith(
        // 缓存中是否存在
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response // 若缓存中存在则返回缓存的数据
                }
                return fetch(event.request).then(response => response) // 否则请求并返回请求到的数据。
            })
            .catch((err) => { // 若出错则返回错误。也可以返回自定义responsec对象
                throw err
                // or
                // return new Response(...`)
            })
    )
    e.respondWith(caches.match(e.request))
})

// demo1
// 若缓存中有相应的数据，则返回缓存中的数据。否则请求数据后保存在缓存中，并返回给请求者。
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // 若缓存中存在则返回，否则请求。
            return response || fetch(event.request).then(res => {
                // 此时缓存中没有。
                return caches.open('v1').then(cache => {
                    // 把数据添加到缓存中
                    cache.put(event.request, res.clone())
                    // 把响应克隆一份后缓存起来。把原始响应返回给调用它的页面。
                    // 请求和响应流只能被读取一次。缓存起来的是克隆出来的，返回给页面的是原始的。
                    return res
                })
            })
        })
    )
})

// demo2
// 更新service worker
// 如果你的 service worker 已经被安装，但是刷新页面时有一个新版本的可用，新版的 service worker 会在后台安装，但是还没激活。当不再有任何已加载的页面在使用旧版的 service worker 的时候，新版本才会激活。一旦再也没有更多的这样已加载的页面，新的 service worker 就会被激活。
self.addEventListener('install', (event) => {
    event.waitUntil(
        // 使用新版本号，不会与别的版本有冲突
        caches.open('v2').then(cache => {
            return cache.addAll([
                '/sw-test/',
                '/sw-test/index.html'
            ])
        })
    )
})
```

#### 删除旧缓存
activate事件可用于删除旧缓存。  
每个浏览器对service worker可用缓存空间不同。
若不控制，则有可能浏览器会全部清空缓存的数据。  

||sw可用空间||
|-|-|-|
|chrome|||
|ff|||
|ie|||
|op|||
|safri|||

```js
// serviceWorker.js
self.addEventListener('activate', event => {
    let cacheWhiteList = ['v2']
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (cacheWhiteList.
                includes(key)) {
                    return caches.delete(key)
                }
            }))
        })
    )
})
```

#### 开发者工具
##### chrome
|||
|-|-|
|chrome://inspect/#service-workers | 展示当前设备上激活和存储的 service worker等。|
|chrome://serviceworker-internals | 可以展示更多细节来允许你开始/暂停/调试 worker 的进程。|

##### firefox
|||
|-|-|
|about:serviceworkers |查看已注册的SW，也可更新、移除|
|检查 Firefox Devtools 的选项 "Enable Service Workers over HTTP (when toolbox is open)" |可绕开https限制。|



### Worker
### 三者关系
ServiceWorkerContainer为service worker提供一个容器般的功能
ServiceWorkerContainer.register() // 返回 ServiceWorkerRegistration
`navigator.serviceWorker`就是ServiceWorkerContainer  

ServiceWorkerRegistration.installing    // 返回service worker
ServiceWorkerRegistration.waiting       // 返回service worker
ServiceWorkerRegistration.active        // 返回service worker

### 困难
1. 知识点多。pwa是渐进式的。若干知识点中，有一个支持了就是实现了pwa.
2. 无详细的、成体系的教程。
3. 好多属性、方法处理试验阶段。浏览器兼容性不好。

### cache
同步的

### [indexedDB]()
常在service worker内做数据存储

### FetchEvent
当页面发生提取动作会在service worker作用域（ServiceWorkerGlobalScope）中触发fetch事件  
继承自Event  

```js
// 监听方式
ServiceWorkerGlobalScope.onfetch
// or
ServiceWorkerGlobalScope.addEventListener('fetch')

// demo
self.addEventListener('fetch', () => {...})
```
#### 构造函数
```js
FetchEvent.FetchEvent()
```

#### 属性
||||||
|-|-|-|-|-|
|属性|||||
||isReload|返回是否由用户触发|||
||request|返回事件控制器的Request|||
||clientId|返回事件的id|||
|方法|||||
||respondWith(任何自定义的响应生成代码)|控制返回的Response对象或网络错误。|可用于劫持http**请求**。||
||waitUntil(promise)|延长事件的生命周期|无返回值|告诉事件分发器，事件仍在进行，直到promise解决。可用于检测是否完成。|
当event.waitUntil的参数promise变为rejected状态时，会丢弃这个服务工作线程。

### [response](/language/javascript/response.html)

### [request](/language/javascript/request.html)
### PushEvent
它还处理实验阶段
```js
// 继承关系
Event <--- Extendable <--- PushEvent

new PushEvent(type[, options]) => PushEvent
type 事件名称
options: { // 会添加到event对象上。
    data // 该属性会被设置为一个新的包含这些字段的PushMessageData对象
}
// demo
let myPushEvent = new PushEvent('push', {data: 'string'})
myPushEvent.data.text() // 'string'

// serviceWorker.js
self.addEventListener('push', (event) => {
    let obj = event.data.json() // 以json格式提取数据
    if (['subscribe', 'unsubscribe'].includes(obj.action)) {
        fireNotification(obj, event)
        port.postMessage(obj)
    } else if (['init', 'chatMsg'].includes(obj.action)) {
        port.postMessage(obj)
    }
})
```

属性、方法都是从祖先原型上继承的。  

|||||
|-|-|-|-|
|||||
|||||

#### PushMessageData
它处理实验阶段。
它是push api的对象。可以让我们找到从服务器发来的push数据。
其方法、属性可调用多次。  

||||||
|-|-|-|-|-|
|无属性|||||
|方法|||||
||arrayBuffer()|以ArrayBuffer的格式提取数据|||
||blob()|以Blob的格式提取数据|||
||json()|以JSON的格式提取数据|||
||text()|以纯文本的格式提取数据|||

### [Fetch API 就是Fetc对象](/language/javascript/fetch.html)

### Notification API
### title
### title
### title
### title

