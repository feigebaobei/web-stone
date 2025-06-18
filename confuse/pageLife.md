# 页面生命周期

<!-- prettier-ignore-start -->
|                  |                        |                   |       |                     |
| ---------------- | ---------------- | --------------- | --- | ------------- |
| DOMContentLoaded | 加载完 html,并构建 DOM 树。外部资源（如 img）可能未加载。 | DOM 已经就绪，可以查找 DOM 节点，并初始化接口。      | vue 等框架渲染完 DOM 后再触发事件。      | 有 async 属性的脚本（script）不会阻塞此事件。使用 document.createElement('script')动态生成并添加到网页的脚本不会阻塞此事件。 |
| load             | 不仅加载完 html，还加载完所有外部资源：图片、样式等       | 外部资源已经加载完成，样式已经被应用，图片大小也已知 |       |                     |
| beforeunload     | 用户正在离开页面       | 可以用于检查用户是否保存，并询问是否要离开。         | event.preventDefault()在此事件中不生效。 |                     |
| unload           | 用户几乎已经离开页面   | 还可以启动一些操作，如发送统计数据。                 |   |                     |
<!-- prettier-ignore-end -->

```
触发顺序
app setup start
子组件 setup start
子组件 mounted
app mounted
DOMContentLoaded
```

## issue

### 关闭页面前发送埋点信息

window.addEventListener('unload', () => {
navigator.sendBeacon(url, data)
})
method: post
data < 64k

### document.readyState

用于标识文档当前状态

<!-- prettier-ignore-start -->
|||||
|-|-|-|-|
|loading|文档正在被加载|||
|interactive|文档已经加载完|||
|complete|外部资源（图片、样式等）已经加载完|||
<!-- prettier-ignore-end -->

readystatechange 事件在状态改变时触发。

### 执行顺序

```
<script>
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>

[1] initial readyState:loading
[2] readyState:interactive
[2] DOMContentLoaded
[3] iframe onload
[4] img onload
[4] readyState:complete
[4] window onload
```

### load

```
window.addEventListener('load', (e) => {})
window.onload = (e) => {}
```

### title

### title

### title
