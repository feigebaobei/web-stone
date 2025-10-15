# iframe

```
<iframe src="demo_iframe.htm" width="200" height="200"></iframe>
```

frameborder 属性规定是否显示 iframe 周围的边框。

不能加载回馈头含有`X-Frame-Options: SAMEORIGIN`的页面。
易受到 xss 攻击。

## 套娃

任何想要使用其祖先页面的 url 作为他的 src 的话，都会被当做一个 src 为空的 iframe （防止无循环套娃）
当成 url 后加上 qs(不重复的值)时，可以实现循环套娃。

### 防嵌套网页

因为 iframe 享有着 click 的最优先权，

```js
//iframe2.html
if (window != window.top) {
  window.top.location.href = correctURL
}

if (top.location.host != window.location.host) {
  top.location.href = window.location.href
}

try {
  top.location.hostname //检测是否出错 //如果没有出错，则降级处理
  if (top.location.hostname != window.location.hostname) {
    top.location.href = window.location.href
  }
} catch (e) {
  top.location.href = window.location.href
}
```

## csp 内容安全策略

可以对 iframe 的嵌套进行一定的控制，保证一定的安全性；

## x-frame-options

头信息中 x-frame-options

|                |                                                                       |                                                         |     |
| -------------- | --------------------------------------------------------------------- | ------------------------------------------------------- | --- |
| SAMEORIGIN     | 表明只有祖先页面的域名是同域的才允许嵌入                              | chrome61 版本后 SAMEORIGIN 会检测所有上层的节点是否同域 |     |
| DENY           | 表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许 |                                                         |     |
| ALLOR-FROM uri | 允许指定特定域名的父级进行嵌套，不过目前基本都被浏览器废弃了          |                                                         |     |

## 属性

### width

### height

### name

iframe 的名称

### frameborder

是否有边框。值为 0/1。

### src

### srcdoc

### scrolling

scrolling="no" 去滚动条

### width

### width

### sandbox

ie10+

iframe 提供了一个 sandbox 模式，这个模式可以对 iframe 的内容进行一系列限制.如果 sandbox 的值是空字符串的话，那么会启动所有的限制；
allow-scripts：允许嵌入的浏览上下文运行脚本
allow-downloads-without-user-activation：允许在没有征求用户同意的情况下下载文件
allow-forms：允许嵌入的浏览上下文提交表单
allow-modals：允许嵌入的浏览上下文打开 Modal
allow-popups：允许弹窗，打开新窗口
allow-same-origin：不设置该属性，任何与该网站的资源交互会被同源策略拦截
allow-top-navigation：允许 iframe 能够主导 window.top 进行页面跳转
allow-pointer-lock：在 iframe 中可以锁定鼠标，主要和鼠标锁定有关

```js
// 可以设置多个值
<iframe
  sandbox="allow-forms allow-same-origin allow-scripts"
  src="..."
></iframe>
```

### allow

fullscreen

# iframe 中的内容

```
iframe.contentWindow
iframe.contentDocument
window.frames['name']
window.parent
window.top
iframe.contentWindow

```

# frameset

html frameset 标签已弃用。用于包含 frame,

# frame

已弃用。

# portal

浏览器都不支持

# iframe 的局限

- 创建比一般的 dom 元素慢 1-2 个数量级
- 阻塞页面加载
- 唯一的连接池
- 不利于 seo

# todo

iframe 的优缺点
iframe 的原理
iframe 能做什么，不能做什么
