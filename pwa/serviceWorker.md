# service worker
> 本质上是web应用、浏览器与网络之间的代理服务器。
> 是一个注册在指定源和路径下的事件驱动worker
> 它设计为完全异步，同步api(如(xhr)这好像有问题/localStorage)不能在service worker中使用
> 只能https承载。本地开发时可以使用`localhost`。也可以使用 [ngrok](/jsPackages/ngrok.html) + [serve](https://www.npmjs.com/package/serve)  
> 在firefox浏览器的用户隐私模式下，service worker不可用。
> webworker / sharedworker 都叫worker。内部都用self指向全局变量。它们都是worker，它管不了主线程里的事。  
> 它在`navigator`下。即：`navigator.serviceWorker`。navigator下还有好多东西。发现好多调用原生、硬件的api在这个对象里。  
> 是浏览器和网络之间的虚拟代理。  

## feature
1. [后台同步](https://wicg.github.io/background-sync/spec/)
2. [信息推送](https://developer.mozilla.org/zh-CN/docs/Web/API/Push_API)
   1. 可以实现后端后前端推送信息
   2. 需要一个被激活的service worker
   3. 可以使用`PushManager.subscribe()`方法订阅消息。
- 在弱网、断网时提供服务
- use background sync
- use push notification
- 监听请求
- 同步消息

## usage
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
    // e.respondWith(caches.match(e.request)) // 只从缓存中取数据
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

// demo3
// 删除旧缓存
// activate事件可用于删除旧缓存。  
// 每个浏览器对service worker可用缓存空间不同。
// 若不控制，则有可能浏览器会全部清空缓存的数据。  
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

// demo4
// 推送消息
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
    在主线程执行serviceWorkerContainer.register(url[, options])
注册成功
    service worker在ServiceWorkerGlobalScope环境中运行。（其中无法访问dom）可接收事件
安装
    解决oninstall事件。
    常用于缓存资源
激活
    清理生前版本的service worker脚本中使用的资源
    常用于清理、更新缓存
开始控制页面
```

```js
// app.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(   // 注册
                                        // 注册完成后，sw.js 文件会自动
                                        // 1. 下载
                                        // 2. 安装
                                        // 3. 然后激活。
        'url/path.js', // 相对于origin。一般在根目录。
        {scope: '/path/'} // 指定注册范围。即：能拦截网络调用的路径
    ) // 返回一个promise.其值是ServiceWrokerRegistration
    .then((registration) => {
        // ...
    })
    .catch((err) => {
        console.log('catch', err)
    })
}
window.addEventListener('install') // 好像用不到
```

## 更新serviceWorker
### 何时更新
- 当进入sw控制的页面时
- 当前已经安装的sw执行`navigator.serviceWorker.register()`到不同的url时。
- 当前已经安装的sw执行`navigator.serviceWorker.register()`改变scope时。最好不要这样做。
- 当“推送”或“同步”等事件在过去24小时内被触发时——但现在还不用担心这些事件。  

### 如何更新
- 如果合适，则使用`importScripts`一个一个地更新  
- sw在顶级代码变动会引起生成新指纹。（workbox）  

### 手动触发更新
上线sw功能时，要开发此功能做为兜底解决方案。  
```js
// 在主线程中执行
// 当sw为active状态时更新
navigater.serviceWorker.ready.then((registration) => {
    registration.update()
})
```

### 解决方案
#### 解决sw中缓存不更新的问题
1. 在主脚本中引入的sw文件名不用动。
2. 在sw文件中定义当前版本号。
3. 在install事件中使用当前版本号缓存资源。
4. 在activate事件中删除非当前版本号的缓存。

#### 一定要考虑清缓存策略

#### 对于变动较频繁的接口，可使用“网络优先”解决。本地缓存在弱网、脱网时使用。

### 增加版本号

## 使用
- 默认缓存一些文件
- 开放供用户选择缓存、清缓存的ui交换界面。
- 开放手动更新sw的功能。

## api
### ServiceWorkerContainer   (navigator.serviceWorker)
ServiceWorkerContainer接口为service worker提供了一个容器般的功能。包括对service worker的注册、卸载、更新、和访问service worker的状态、 以及它们的注册者。 
`navigator.serviceWorker`就是ServiceWorkerContainer  

||||||
|-|-|-|-|-|
|属性|||||
||controller|当service worker状态为active时，返回ServiceWorkder对象。否则返回null|||
||ready|返回一个promise，当serviceworker为active状态时promise变为fulfilled状态。该promise永远不会变为rejected状态|||
|方法|||||
||register(scriptUrl[, {scope: USVString}])|返回一个ServiceWorkerRegistration（优先）。或返回一个值是ServiceWorkerRegistration的promise|scope指定service worker注册范围。能拦截网络调用的路径范围。只能拦截service worker文件所在的目录及其子目录范围内的请求。（即：最大作用域在它的所在位置。）|经过测试，只能注册一个service worker。后面的会覆盖前面的。|
||getRegistration()|根据当前网页的url返回一个ServiceWorkerRegistration或null|||
||getRegistrations()|返回所有ServiceWrokerRegistration或null|||
||startMessages()||||
|事件|||||
||oncontrollerchange|当serviceworker变为active时触发|||
||onerror|当serviceworker中出现错误时触发|||
||onmessage|当ServiceWorkerContainer对象接收到一个message消息时触发。|message是MessagePort.postMessage()发出的||

### ServiceWorkerRegistration 对象
这是一个实验中的功能
它是注册了service worker的注册证（是一个容器）。

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
||showNotification(title, options?: {actions: [{action, title, icon}, ...], badge, body, data, dir, icon, image, lang, renotify, requireInteraction, silent, tag, timestamp, vibrate})|创建一个通知|||
||update(无参数)|ServiceWorkerRegistration接口的update()方法试图更新service worker。它获取worker的脚本URL，如果新worker与当前worker不完全相同，它就安装新worker。如果之前的读取发生在24小时之前，那么worker的读取将绕过任何浏览器缓存。返回一个值是ServiceWorkerRegistration的promise|||
||unregister()|注销这个service worker，返回一个值是boolean的promise。boolean表示是否被注销。|||

### ServiceWorkerGlobalScope
代表一个service worker的全局变量。  
serviceworker中不能使用同步请求，只能使用异步请求。

代表sw的全局可执行环境。

```js
// 原型链
EventTarget <-- WorkerGlobalScope <-- ServiceWorkerGlobalScope
```

|||||||
|-|-|-|-|-|-|
|属性|都是只读|||||
||caches|使用sw得到CacheStorage||||
||clients|返回与当前sw相关连的Clients对象||||
||registration|返回当前sw的注册的ServiceWorkerRegistraion对象||||
|事件||||||
||activate|当ServiceWorkerRegistration执行active方法里执行。||||
||contentdalete|当删除条目时触发||||
||fetch|当发出请求时||||
||install|当执行install方法时||||
||message|当接收到消息时触发||||
||notificationclick|当执行ServiceWorkerRegistration.showNotification()时触发||||
||notificationclose|xx||||
||sync|当注册了Syncmanager并连能时触发|不能取消冒泡|||
||periodicsync|当注册PeriodicSyncManager时触发||||
||push|当收到一个消息时触发||||
||pushsubscriptionchange|好像是当改变推送订阅者是触发||||
|方法|全部继承自worker|||||
||skipWaiting()|强制等待sw成为active状态|Promise<undefined>|||
||fetch(resource, options?: {method, headers, body, ...})|就是fetch方法|Promise<Response>|||
||skipWaiting()|||||

### ServiceWorker
- 继承自[worker]()
- 这是一个实验中的功能  
- 它是服务工作者  
- 允许访问推送通知、后台同步api

|||||||
|-|-|-|-|-|-|
|属性|都是只读|||||
||scriptUrl|脚本的url||||
||state|返回service worker的状态||||
|事件|全是小写|||||
||onstatechange|||||
||fetch|当控制范围内的页面有请求时触发||||
||install|安装时触发||||
||activate|激活时触发||||
||push|||||
|方法|全部继承自worker|||||

### WorkerGlobalScope
### SyncManager
|||||||
|-|-|-|-|-|-|
|属性||||||
|事件||||||
|方法||||||
||register(options?: {allowOnBattery, id, idleRequired, maxDelay, minDelay, minPeriod, minRequiredNetwork})|返回一个值为SyncRegistration的promise||||
||getTags()|返回一个值为开发者定义的SyncManager注册证的标识的promise||||

### PeriodicSyncManager
https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API  
它的功能正如它的名字：定期同步消息。
以前在项目中使用setInterval实现此功能。   

|||||||
|-|-|-|-|-|-|
|属性||||||
|事件||||||
|方法||||||
||register(tag, options?: {minInterval})|注册一个定期请求实现同步消息。|返回值Promise<undefined>|||
||getTags()||返回注册证的标记。Promise<string[]>|||
||unregister(tag)|注销指定的注册证|Promise|||

## 设置scope的范围
前提：默认最大作用域在它的所在位置。  

- 把serviceWorker.js文件放在根目录上。  
- 设置serviceWorker.js的响应头 Service-Worker-Allowed 为 `/`

## uml

## todo
### [MessagePort]()
### 名称
工作线程。

### PushManager
### SyncManager
### Notification
### StorageManager
window.navigator.storage
用于管理数据本地存储权限和估算可用存储空间的对象。  

|StorageManager|||||
|-|-|-|-|-|
|方法|||都是返回promise||
||estimate()|估算域名下storage manager的总存储空间和已经使用了的存储空间|{quota, usage, usageDetails: {}}||
||persist()||返回是否有在本地数据存储的权限||
||persisted()||返回是否是盒存储模式||
||estimate()||||

#### sw可用空间

||sw可用空间|||||
|-|-|-||||
|chrome|可使用80%的总磁盘空间。StorageManager API可确定最大配额|||||
|ff|可使用50%的可用磁盘空间。最多可用2g|||||
|ie 10|最多250m。当>10m时提示用户|||||
|op||||||
|safri|约1g。当达到限制时，会提示用户，每次可增加200m。|||||

#### 开发者工具
##### [chrome](/browser/chromeDevtools.html)
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


### [cache](/frontStore/cache.html)
同步的

### [indexedDB](/frontStore/indexedDB.html)
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
||respondWith(任何自定义的响应生成代码)|控制返回的Response对象或网络错误。|可用于劫持http**响应**。||
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

### Notification API
### WindowClient
该对象是sw的控制范围。
```js
// 原型链
Client <-- WindowClient
```

|||||||
|-|-|-|-|-|-|
|focused|指定的windowClient是否被聚焦|||||
|vivibilityState||返回指定windowClient的可见状态|hidden/visible/prerender|||
|focus()|聚集到当前client|||||
|navigate(url)|加载指定的url到控制的client的页面|返回一个值为xxx的promise||||

### Client
该对象是可执行环境。如worker
|||||
|-|-|-|-|
|id|client的惟一标识|只读||
|type|client的种类|只读|window/worker/sharedworker|
|url|client的url|只读||
|postMessage()||||

### title
### title

