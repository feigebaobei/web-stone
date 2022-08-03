# pwa
> Progressive Web Apps  
> 是一个网页。拥有app般的用户体验  
> 2015年提出。2016年推广。好像safri不支持  
> 

## feature
- 渐进增强:检测当前浏览器的是否支持指定功能，若支持则使用，否则使用使用基本功能。  
- 断网可用基本功能。  
- 类原生应用，可安装。在移动设备上都可安装。
- 安全。使用https提供服务。（service worker只能在https中工作）(本地可使用ngrok)
- eso友好
- 信息推送

## demo
1. 创建一个html页面。
2. 添加`manifest.json`文件  
3. 添加service worker（可实现无网运行）  

## 主要技术
- [manifest.json]()
- [service worker]()
- [caches]()

## app shell
就是与页面中主体部分无关、几乎每个页面都会使用的.  
尽快加载最小用户界面，然后缓存它，以便在后续访问时可以离线使用。下载使用时从缓存中取出。





## service worker
- 在弱网、断网时提供服务
- use background sync
- use push notification
- 监听请求、同步消息


webworker / sharedworker 都叫worker。内部都用self指向全局变量。  
它在`navigator`下。即：`navigator.serviceWorker`。navigator下还有好多东西。
是浏览器和网络之间的虚拟代理。  
它是worker，它管不了主线程里的事。  

### 生命周期
1. 在主线程（js中无主线程。html引入的js当作是主线程）中注册service worker
2. 触发install事件
3. service worker 成为活跃状态
4. 触发active事件
5. service worker 开始监听事件
### 注册
```js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('url/sw.js')
}
```
注册完成后，sw.js 文件会自动
1. 下载
2. 安装
3. 然后激活。

## 安装
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

### 推广安装的方法
- 将推广置于用户操作流程之外。例如，在 PWA 登录页面中，将行动号召放在登录表单和提交按钮下方。滥用推广模式会降低 PWA 的可用性，并对您的参与度指标产生负面影响。
- 包括关闭或拒绝推广的功能。请记住用户在执行此操作时的偏好，并且仅在用户与您内容的关系发生变化（例如他们登录或完成购买）时才重新提示。
- 在 PWA 的不同部分融入以上多种方法，但要小心不要让安装推广使您的用户应接不暇或感到懊恼 。
- 仅在触发 beforeinstallprompt 事件后显示推广。

### 应用程序 UI 推广
- **简单安装按钮** 最简单可行的用户体验是在 Web 内容的适当位置加入“安装”或“获取应用”按钮。确保该按钮不会阻止其他重要功能，并且不妨碍用户在您应用程序中的整个旅程。
- **固定标题** 这是一个安装按钮，是您站点标题的一部分。其他标题内容通常包括站点品牌，例如徽标和汉堡菜单。标题可能是也可能不是 position:fixed，具体取决于您站点的功能和用户需求。
- **安装横幅** 页面顶部的自定义安装横幅。页面顶部的可关闭横幅。大多数用户都在移动体验中遇到过安装横幅，并且熟悉横幅所提供的交互。横幅会干扰用户，因此应谨慎使用。
- **临时 UI** snackbar
- **信息流内** 您的 PWA 中的新闻文章或其他信息卡列表之间会出现一个信息流广告安装推广。微信就这么搞。

### 提示安装
- 浏览器有在满足条件下提示安装。
- 我们也可以自定义触发提示安装。
- 自定义的安装提示比浏览器自带的要好看。  
- 当浏览器检测到web应用可安装时，会触发`beforeinstallprompt`事件。
  1. 监听beforeinstallprompt事件
  2. 暂时保存它。后面会用。
  3. 触发保存的事件
  4. 此方法的兼容性不太好。
  5. 此方法只是延迟安装+改变ui，仍然需要浏览器去安装。

```js
let deferredPrompt // 也可以命名为别的变量
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    showInAppInstallPromotion() // 自定义的提示安装的方法
})
```

### 安装过程
1. 当浏览器检测到web应用可安装时，会触发`beforeinstallprompt`事件。
2. 安装时触发`appinstalled`事件，无论是浏览器触发、还是用户触发。  
3. 

### 兼容性
- 当浏览器不支持`beforeinstallprompt`时，就不能实现延迟安装了。
- 需要使用显示教导用户手动安装的教程。  
- 使用'display'控制吧。  



## title
## title
## title
## title
## title
## title
## title
## title


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
### window.caches
```
CacheStorage {}
    __proto__: CacheStorage
    delete: ƒ delete()
    has: ƒ has()
    keys: ƒ keys()
    match: ƒ match()
    open: ƒ open()
    constructor: ƒ CacheStorage()
    Symbol(Symbol.toStringTag): "CacheStorage"
    __proto__: Object
```

### [fetch](/language/javascript/fetch.html)
### indexedDB
### [ngrok](/jsPackages/ngrok.html)
可使用外网url访问本地服务的包。

### BeforeInstallPromptEvent
- 当用户被提示“安装”web到设备时触发。
- 继承自[Event](/language/javascript/event.html)接口  
- 兼容性不太好  

`new window.BeforeInstallPromptEvent(name, eventInitOptions)`  

|||||||
|-|-|-|-|-|-|
|属性|只读|||||
||platform|设备平台信息||||
||userChoice|返回一个可以解析为DOMString的Promise|'install' \ 'dismissed'|||
|方法||||||
||prompt()|弹出安装提示，返回promise|无参数|||

```js
window.addEventListener("beforeinstallprompt", function(e) {
  // log the platforms provided as options in an install prompt
  console.log(e.platforms); // e.g., ["web", "android", "windows"]
  e.userChoice.then(function(outcome) {
    console.log(outcome); // either "installed", "dismissed", etc.
  }, handleError);
});

```
### [vue-pwa-install](https://github.com/Bartozzz/vue-pwa-install)
### [react-pwa-install](https://www.npmjs.com/package/react-pwa-install)
### title
### title
### title

