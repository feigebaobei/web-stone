# 浏览器扩展插件

Content Script API 的运行方式是注入到特定的网页中执行。

需要在插件清单文件（manifest.json）中声明 Content Script。

需要在插件清单文件（manifest.json）中声明 Content Script。

通过 run_at 字段，可以指定 Content Script 的注入时机。可以选择在文档开始加载时注入（document_start）、文档结束加载前注入（document_end）或默认情况下在文档加载完成后注入（document_idle）。
json 体验 AI 代码助手 代码解读复制代码

权限：需要在插件的 manifest.json 文件中声明权限，才能访问网页的内容。
跨域访问：由于 Content Script 是在网页的上下文中运行的，所以需要注意跨域访问的问题。
异步调用：由于它是异步调用的，所以需要使用 Promise 和回调函数处理异步操作。
页面状态：由于它是在网页的上下文中运行的，所以需要注意页面的状态，避免在页面未加载完成时进行操作。

字段名描述
chrome.runtime.onMessage.addListener()用于监听来自扩展程序的后台页面或其他
content script 发送的消息
chrome.extension.getURL()用于获取扩展程序中指定文件的
URLdocument.createElement()用于在当前页面中创建新的
HTML 元素 window.addEventListener()用于监听当前页面中的事件，如点击、滚动、键盘按键等
chrome.runtime.executeScript()在指定的标签页中执行
JavaScript 代码 chrome.runtime.insertCSS()向指定的标签页动态注入 CSS 样式
chrome.tabs.sendMessage()向指定标签页发送消息并接收响应

你不能将代码注入浏览器的任何内置页面，例如：about:debugging、about:addons 或打开新空白标签页时打开的页面。

## 内容脚本

在每一个 extension 的每一个 frame 中，只有一个全局作用域。所以在一个 content script 中的变量可以被另外的 content script 访问到，而与 content script 如何被加载无关。

### 向页面注入 js 代码

Manifest V2 使用
tabs.executeScript()
Manifest V3 使用
scripting.executeScript()
将脚本注入目标上下文。默认情况下脚本将在 document_idle 时运行。

### 后台脚本通信

尽管 content scripts 不能直接使用大部分 WebExtension APIS，但他们可以通过使用 messaging APIS 与扩展的后台脚本通信，然后便能够间接地调用所有的后台脚本能够调用的 APIS。

## js

JS 种类 可访问的 API DOM 访问情况 JS 访问情况 直接跨域
injected script 和普通 JS 无任何差别，不能访问任何扩展 API 可以访问 可以访问 不可以
content script 只能访问 extension、runtime 等部分 API 可以访问 不可以 不可以
popup js 可访问绝大部分 API，除了 devtools 系列 不可直接访问 不可以 可以
background js 可访问绝大部分 API，除了 devtools 系列 不可直接访问 不可以 可以
devtools js 只能访问 devtools、extension、runtime 等部分 API 可以 可以 不可以

## background.js

```js
let bg = chrome.extension.getBackgroundPage()
bg.fn() // 使用指定方法
```

## title

## title

## title
