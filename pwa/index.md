# pwa
> Progressive Web Apps  
> 是一个网页。拥有app般的用户体验  
> 2015年提出。2016年推广。好像safri不支持。都这么多年过去了，还不能全面支持。还有多好功能处理实验阶段。要加油呀！  
> 

## feature
- 渐进增强:检测当前浏览器的是否支持指定功能，若支持则使用，否则使用使用基本功能。保证网页提供完整功能。  
- 断网可用基本功能。  
- 类原生应用，可安装。在移动设备上都可安装。
- 安全。使用https提供服务。（service worker只能在https中工作）(本地可使用ngrok)。本地开发时的localhost也认为是安全链接。
- eso友好
- 信息推送

## 主要技术
- [https]()
- [manifest.json](/pwa/manifestJson.html)
- [service worker](/pwa/serviceWorker.html)
- [caches](/frontStore/cache.html)
- [indexedDB](/frontStore/indexedDB.html)
- [fetch](/language/javascript/fetch.html)
- [push](/pwa/push.html)  

## app shell
就是与页面中主体部分无关、几乎每个页面都会使用的.  
尽快加载最小用户界面，然后缓存它，以便在后续访问时可以离线使用。下载使用时从缓存中取出。

## demo
4. 创建一个html页面。
5. 添加 [`manifest.json`](/pwa/manifest.json) 文件  
6. 添加`app.js`文件。在app.js中注册`serviceWorker.js`  
7. 在`serviceWorker.js`中 
   1. install时缓存常用的资源。`cache.addAll([...])`  
   2. 在fetch时缓存相应的资源。`cache.put(req, res)`  
   3. 在activate时删除不用的cache缓存.`caches.delete(cacheName)`  

```js
// app.js
let tryRegister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js').then(registration => {
      console.log('注册成功', registration)
    }).catch(error => {
      console.log('注册失败', error)
    })
  } else {
    console.log('当前浏览器不支持serviceWorker')
  }
}
tryRegister()

// serviceWorker.js
self.addEventListener('install', event => {
  event.waitUntil(
    // 使用新版本号，不会与别的版本有冲突
    caches.open('v2').then(cache => {
        return cache.addAll([
            '/',
            '/index.html'
        ])
    })
  )
})
self.addEventListener('fetch', event => {
  event.respondWith(
        caches.match(event.request).then((response) => {
            // 若缓存中存在则返回，否则请求。
            return response || fetch(event.request).then(res => {
                // 此时缓存中没有。
                return caches.open('v2').then(cache => {
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
self.addEventListener('activate', event => {
    let cacheWhiteList = ['v1'] // 设置需要删除的cacheName
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

## [安装桌面链接](/pwa/install.html)
### 自动安装条件：
- 未安装该web应用。
- 符合用户参与启发式
- 使用https提供服务
- 有web应用清单（manifest.json）
  - short_name / name
  - icons
  - short_url
  - display: fullscreen、standalone 或 minimal-ui
  - 不能有 prefer_related_applications，或值为 false
- 使用 fetch 处理程序注册服务工作进程

## 卸载
使用homepage上的链接打开网站。在`...`中选择“卸载”  

## 适用范围
- 需要解决弱网、断网问题。
- 页面内容多用静态形式。
- 一段时间内接口提供的数据无变化。
- 应用中有一些资源需要前端缓存起来。如：游戏中的背景音乐
- shell部分比较多。
- 希望给用户提供一个基本的shell功能。
- 希望提供最后一次覆盖的数据。

## todo
### Native App & Web App & Hybrid App & PWA
||Native App | Web App | Hybrid App | PWA||
|-|-|-|-|-|-|
||可使用移动设置全部功能。开发成本高、维护成本高。需要应用商店审核|跨平台开发，用户无需下载，在浏览器中打开使用。开发成本低。|半原生半web混合开发。需要下载。用户体验不好原生应用，需要大量html/css.性能稍慢。|Blink内核（Chrome、Oprea、Samsung Internet 等）和 Gecko内核（Firefox）和Microsoft Edge都已经实现了 PWA 所需的全部关键技术的支持。但IOS的Safari（Webkit）不支持。||
|||||||
||使用框架开发或指定设置的sdk开发|||使用h、c、j开发||
||需要使用app store发布或下载|||使用url获取，不使用app store||
||可安装到主屏幕上|||可安装在主屏幕上||
||在硬件设置上运行|||在浏览器中运行||
||可使用硬件设置|||可使用硬件设置||
||可用于弱网、或断网。|||可用于弱网、或断网。||
||可接收推送来的消息|||可接收推送来的消息||
|||||||
|||||||
|||||||
|||||||

### streams api

### materialize
### https://developers.google.com

### [indexedDB](/frontStore/indexedDB.html)

### [ngrok](/jsPackages/ngrok.html)
可使用外网url访问本地服务的包。

### [vue-pwa-install](https://github.com/Bartozzz/vue-pwa-install)

### [react-pwa-install](https://www.npmjs.com/package/react-pwa-install)

### push api 好像是servicer worker提供的能力
### notification triggers api
### [idb](https://www.npmjs.com/package/idb)
### [workbox](/pwa/workbox.html)
### title

### 困难
1. 知识点多。pwa是渐进式的。若干知识点中，有一个支持了就是实现了pwa.
2. 无详细的、成体系的教程。
3. 好多属性、方法处理试验阶段。浏览器兼容性不好。

### 与react结合使用 
1. 执行`npx create-react-app my-app --template cra-template-pwa`后把`src/serviceWorkerRegistration.js`和`src/service-worker.js`复制到现有项目的对应位置。
2. 在`src/index.js`添加`import * as serviceWorkerRegistration from './serviceWorkerRegistration';`。再添加`serviceWorkerRegistration.register();`。  
3. 在命令行中执行`npm run build && serve -s build`。
4. 在浏览器中打开相应的url，可看到效果。

1. 再添加一些`fetch`/`activate`事件对应的方法

必须要学习workbox + 
### [workbox-webpack-plugin](/builder/webpack/plugin/workbox-webpack-plugin.html)

### 与vue结合使用 