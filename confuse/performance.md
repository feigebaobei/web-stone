# 性能及优化

> 应该明确需要优化什么。然后针对性优化。

## 网络

http2 多路复用
头部压缩

## 代码与渲染优化（运行时）

### 懒加载 lazy loading

可以减少初始包体积
图片、路由、组件懒加载。

```
<img src="xxx" alt="xxx" loading="lazy" />
```

[异步组件 （defineAsyncComponents）](/framework/vue3/component.html)
只在需要时加载，减少首屏加载时间。
代码分割。

### [虚拟滚动](/confuse/virtualScroll.html)/虚拟列表

处理长列表时，只渲染视口内可见的元素，大幅减少 dom 操作。
vue-virtual-scroller
vue-virtual-scroll-grid
vueuc/VVirtualList

### 响应式优化

避免不必要的响应式
shallowRef shallowReactive 用于大对象。只深度监听顶层属性。
静态数据标记。markRaw(xx).
memoize，缓存计算密集型函数的计算结果。

### 静态属性优化。

在模板中标记不需要响应的静态内容。如：
v-once 只渲染一次
v-pre 不渲染（即直接使用）

### 合理使用 v-if v-show

v-if 条件渲染（控制 dom 是否存在）
v-show 切换显示、隐藏。（dom 总是存在，是否可见）

### 缓存

keepAlive 缓存组件实例，避免重复渲染。（慎用，避免内存堆积）
使用 computed 的缓存性质。

### 避免不必要的组件抽象

组件实例比 dom 使用资源多。
减少几个组件对运行没有太多影响。
在大型列表中应该减少不必要的组件抽象。

### 请求去抖、节流、批量

## 性能监控与调试

### [lighthouse]()

### [performance]()

### webpack bundle analyzer / vite bundle analyzer

分析打包体积

### vue devtools

检查组件层级、性能分析

### 全局错误捕获

```js
app.config.errorHandler = (err, vm, info) => {
  Sentry.captureException(err) // 发送到Sentry
}
```

### 多线程

把复杂计算移到 worker 线程中

```js
// heavyCalculation.worker.ts
self.onmessage = function (e) {
  const { data, algorithm } = e.data
  // 执行CPU密集型计算
  const result = performComplexCalculation(data, algorithm)
  postMessage(result)
}

// 父线程调用
const worker = new Worker(
  new URL('./heavyCalculation.worker.ts', import.meta.url)
)
worker.postMessage({ data: largeDataset, algorithm: 'md5' })
worker.onmessage = (event) => {
  updateUI(event.data) // 仅负责更新DOM
}
```

## 开发习惯

### 组件化、模块化

组件保持小而精。
不能太小。不能太大。

### 避免在 watch computed 中进行 dom 操作

### 合理使用 key。

v-for 中提供唯一 key,使 vue 高效更新。

### 保持 props 稳定

当组件的任一 props 改变时，组件就会更新。

```js
<span
    v-for="item in list"
    key="item.id"
    :active="item.id === activeId"   // 优 列表中2个元素会变
    :activeId="activeId"             // 差 全列表会变
>
```

### 减少 dom 操作

## 用户体验优化

### v-clock

隐藏未完成编译的 dom 模板。

### v-memo

当新值与最后一次的值相同时，跳过渲染，使用上一次的渲染结果。

## 构建（开发、构建时）

### 代码分割、按需加载

把依赖包拆出来

```js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 手动指定要分割的内容
          'vue-vendor': ['vue', 'vue-router'],
          'ui-library': ['element-plus'],
        },
      },
    },
  },
}
```

### Gzip/Brotli 压缩/压缩资源

服务器配置压缩，减小传输体积。
（超出了前端工程师的工作边界）
用打包工具压缩资源。

### 浏览器缓存 、 [service workers](/pwa/serviceWorker.html)

配置 http 缓存头，利用浏览器缓存静态资源。
expires / Cache-Control 可以用于非首次加载。

### dns 预解析、预连接、预加载

优化域名解析和 tcp 连接
预加载可能需要的资源。（非首页）

### 使用 CDN

加速资源分发

### 图片优化

- 压缩图片，使用 webP 格式(比 jpeg 小 30%)，懒加载图片
  - tinypng 免费、批量、速度块
  - 智图压缩 百度很难搜到官网了，免费、批量、好用
  - squoosh 在线图片压缩工具
  - compressor 支持 JPG、PNG、SVG、GIF
- sprite 图
- 渐进式图片。先使用压缩图，再使用高清图。
- [图片响应式](/confuse/imgReactive.html)。在不同尺寸的设备上使用不同的图片。

```
<!-- 解决了兼容性问题 -->
@media  screen and (min-width: 1200px) {
   img {     background-image: url('1.png');   }
}
@media  screen and (min-width: 992px) {
   img {     background-image: url('2.png');   }
}
```

- 图片预加载

```js
function preloader() {
  if (document.images) {
    var img1 = new Image()
    var img2 = new Image()
    var img3 = new Image()
    img1.src = 'http://domain.tld/path/to/image-001.gif'
    img2.src = 'http://domain.tld/path/to/image-002.gif'
    img3.src = 'http://domain.tld/path/to/image-003.gif'
  }
}
function addLoadEvent(func) {
  var oldonload = window.onload
  if (typeof window.onload != 'function') {
    window.onload = func
  } else {
    window.onload = function () {
      if (oldonload) {
        oldonload()
      }
      func()
    }
  }
}
addLoadEvent(preloader)
```

- 图片懒加载

```js
const imgs = document.querySelectorAll('img[data-src]')
const config = {
  rootMargin: '0px',
  threshold: 0,
}
let observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let img = entry.target
      let src = img.dataset.src
      if (src) {
        img.src = src
        img.removeAttribute('data-src')
      }
      // 解除观察
      self.unobserve(entry.target)
    }
  })
}, config)

imgs.forEach((image) => {
  observer.observe(image)
})
```

### 包体积、tree-shaking

tree-shaking 由打包器决定是否支持。
代码中需要使用组合式，（就是方法。）支持 tree-shaking。使用选项式（就是对象）不支持 tree-shaking。

## 兜底解决方案——异步

## 性能

## 总结

要优化什么 & 怎么做
以上方法都能做到优化。但是每项的优先量不同，有的立杆见影，有见效微小。

<!-- prettier-ignore-start -->
| 优化点  | 如何做（作用太小的不列出来）    |     |     |
| ----- | ------------- | --- | --- |
| 选择合理的架构（ssr/csr/ssg） |              |     |     |
| 首屏加载时间 | 路由懒加载，service work（比较难，有兼容性） > 代码分割(使用动态引入实现) > 异步组件，懒加载图片 >           |     |     |
| 加载速度     | 代码分割(使用动态引入实现) > Gzip / Brotli，sprite，压缩文件，cdn > 浏览器缓存，service workers> 异步加载组件、js 依赖 > 预加载 > 使用 http2 协议 |     |     |
| 打包体积（项目体积）          | 路由懒加载，代码分割，资源压缩，tree-shaking，通用资源放在 cdn+忽略指定依赖，200k 以下的图片用 base64，不使用代码地图           |     |     |
| 开发体验     | 统一开发规范，   |     |     |
| 用户体验     | 虚拟列表、滚动，v-memo，懒加载图片，骨架图，所见即所得，             |     |     |
| 运行速度（性能）              | 合适的数据结构+算法，workers，  |     |     |
| 占用内存     | 良好的数据结构，                |     |     |
| 占用空间     | |     |     |
<!-- prettier-ignore-end -->

## 前端性能指标

### FP(First Paint)首次绘制

绘制出第一个视觉元素。
减少 css/js 的体积。
`<link rel="preload">`提前加载关键资源。
应该优化首屏加载时间。

### LCP（Largest Contentful Paint）

绘制最大可见元素用时。一般要求在 2.5s 内
优化图片等大资源的加载，使用懒加载、图片压缩、webp 格式。
关键资源优先加载。使用`<link rel="preload">`或`<img srcset>`。
对于动态内容，考虑使用骨架屏或占位符元素，直到 LCP 元素加载完毕。

```html
<div class="box">
  <img
    src="/zh-CN/docs/Web/HTML/Element/img/clock-demo-200px.png"
    <!--
    在1x显示器上显示
    --
  />
  alt="钟表" srcset="/zh-CN/docs/Web/HTML/Element/img/clock-demo-400px.png 2x"
  />
  <!-- 在2x显示器上显示 -->
</div>
```

### CLS（Cumulative Layout Shift）

累计布局偏移量。会触发重绘、回流。
避免在页面加载期间修改已渲染元素的尺寸，确保所有元素尺寸提前计算好。
使用 height 和 width 属性为图片和 iframe 等元素指定尺寸。
动态插入内容时，预留空间或使用 CSS 动画而非即时布局变化。
避免使用 position: fixed;或 sticky;导致的布局偏移，除非绝对必要。

```css
/* 预先设定图片尺寸 */
img {
  width: 100%;
  height: auto;
}
```

### FMP（First Meaningful Paint）

首次有效绘制。
用户看到他们认为有意义的东西。
被 lcp 代替了。

## 测量工具

使用代码拆分和异步加载减少 JavaScript 的阻塞。
优化服务器响应时间和网络连接，使用 HTTP/2 和 CDN。
定期进行性能审计，使用 Lighthouse、WebPageTest 等工具。

## css

首次有效绘制。
非首次有关 css,使用 prefetch.
压缩 css 文件。
选择器的写法 - 少使用复杂的选择器 - 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用。 - 不要使用类选择器和 ID 选择器修饰元素标签，如 h3#markdown-content，这样多此一举，还会降低效率。 - 不要为了追求速度而放弃可读性与可维护性。

### 昂贵的属性

|               |     |     |     |
| ------------- | --- | --- | --- |
| box-shadow    |     |     |     |
| border-radius |     |     |     |
| filter        |     |     |     |
| 透明度        |     |     |     |
| :nth-child    |     |     |     |

### 减少 reflow

- 改变 font-size 和 font-family
- 改变元素的内外边距
- 通过 js 改变 css 类
- 通过 js 获取 dom 元素的位置相关属性（如 width/height/left）
- css 伪类激活
- 滚动滚动条或者改变窗口大小。
- 使用 Flex 时，比使用 inline-block 和 float 时重排更快
- 硬件加速 style.left transtorm: translate
- 不要使用 @ import

### 字体

- preload 字段防止 fout

```
<head> ... <link rel="preload" as="font" href="/assets/fonts/AvenirNextLTPro-Demi.otf" crossorigin> <link rel="preload" as="font" href="/assets/fonts/AvenirNextLTPro-Regular.otf" crossorigin> ... </head>
```

- font-spider
  字蛛是一个智能 WebFont 压缩工具，它能自动分析出页面使用的 WebFont 并进行按需压缩。

```
@font-face {
    font-family: "pinghei";
    src: url("./font/苹方特粗体.ttf");
    font-weight: normal;
    font-style: normal;
}

div {
    font-family: "pinghei";
}
```

- fastdom
- react-window
  不用全部加载出所有的 DOM 节点。默认只渲染可视区域及可视区域外的一个节点，此属性可自定义设置。
  可用于处理大型数据列表。当使用在大型数据列表中，可避免因为数据的更新而导致大量的重新渲染。
- requestIdeCallback
- 防抖
- 节流
