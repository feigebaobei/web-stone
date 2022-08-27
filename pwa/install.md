
## 安装桌面链接
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
    deferredPrompt = e  // 暂存安装事件
    showInAppInstallPromotion() // 自定义的提示安装的方法
})
let showInAppInstallPromotion = () => {
  deferredPrompt.prompt() // 使用暂存的安装事件
  deferredPrompt = null   // 释放内存
}
```

### 安装过程
1. 当浏览器检测到web应用可安装时，会触发`beforeinstallprompt`事件。
2. 安装时触发`appinstalled`事件，无论是浏览器触发、还是用户触发。可用户监听是否安装。  

### 兼容性
- 当浏览器不支持`beforeinstallprompt`时，就不能实现延迟安装了。
- 需要使用显示教导用户手动安装的教程。  
- 使用'display'控制吧。  

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

### 检测启动方式
css的`display-mode`与manifest.json中的display相同。可用于查询pwa的启动方式。
```js
// 返回一个MediaQueryList
window.matchMedis(mediaQueryString) => MediaQueryList
let mql = window.matchMedia('(max-width: 600px)')
document.querySelector('.a').innerText = mql.matches
// 返回pwa的启动方式
let getPWADisplayMode = () => {
  let isStandalone = window.matchMedia('(display-mode: standalone)').matches
  if (document.referrer.startsWith('android-app://')) {
    return 'twa'
  } else if (navigator.standalone || isStandalone) {
    return 'standalone'
  }
  return 'browser'
}
// 跟踪显示模式变化
window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
  let displayMode = 'browser'
  if(e.matches) {
    displayMode = 'standalone'
  }
})
// 使用媒体查询更新样式
@media all and(display-mode: standalone) {
  body {...}
}
```

#### MediaQueryList
保存了媒体查询的信息。

||||||
|-|-|-|-|-|
|属性|||||
||matches|只读|是否与当前document匹配|boolean|
||media|只读|返回字符串||
|方法|||||
||addListener()||||
||removeListener()||||
|事件|||||
||change||||
