# 与 pw 结合的录制用户操作的浏览器扩展程序

manifest
popup 页面
sidePanel 页面
background.js
contentScript.js
消息通信
storage
核心机制
`Browser Process |------| |-----------------------------------------------| | | 收发消息 | Extension process | | |<------->| |----------------| |----------------| | | | | | background.js | | popup.html | | | | | | 浏览器启动时运行，| | tab.html | | | | | | 运行在后台 | | notify.html | | | | | | | | 按需加载，手动触发 | | | | | |----------------| |----------------| | | | |-----------------------------------------------| | | | | | | |-----------------------------------------------| | | 收发消息 | PageRender process | | |<------->| |----------------| |------------------| | | | | | web page | | contentScript.js | | | | | | *.html *.js | | 独立运行空间 | | | | | | *.css *.png | | 可访问bom/dom | | | | | | ... | | | | | | | |----------------| |----------------| | | | |-----------------------------------------------| |------|`
收发消息
backgroun.js chrome.tabs.sendMessage() chrome.tabs.onMessage()
contentScript.js chrome.runtime.sendMessage() chrome.runtime.onMessage()
popup.html/sidePanel.html chrome.tabs.sendMessage() chrome.runtime.onMessage()
数据结构
{
id
name
description
selector
key
url
button
modifiers
clickCount
pageAlias
framePath
locator
target
asserts: {}
}
slide&drag
position:{from, to}
selector:{drag, drop}
