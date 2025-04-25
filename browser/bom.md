# bom

iframe.contentWindow 来获取 <iframe> 中的 window。
iframe.contentDocument 来获取 <iframe> 中的 document，是 iframe.contentWindow.document 的简写形式。

通过索引获取：window.frames[0] —— 文档中的第一个 iframe 的 window 对象。
通过名称获取：window.frames.iframeName —— 获取 name="iframeName" 的 iframe 的 window 对象。

## window

```
window.open(url, name, feature)
window.location.href
window.history.back()
window.navigator.userAgent
window.close()
window.setTimeout(...)
window.setInterval(...)
window.postMessage(...)
window.top 顶层窗口。当已经是顶层窗口时，返回自身的引用。
window.parent 父层窗口。当已经是顶层窗口时，返回自身的引用。

```

## window & document

```
window.document // document
```

## 父子页面通信

```js
// 子页面
let buttonDom = document.querySelector('button')
buttonDom.addEventListener(
  'click',
  (event) => {
    let iframeWin = iframeDom.contentWindow
    let msg = 'sss'
    let targetOrigin = 'http://localhost:3002'
    iframeWin.postMessage(msg, targetOrigin)
  },
  false
)

// 父页面
window.addEventListener('message', handle, false)
```
