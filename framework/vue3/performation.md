# 性能及优化

> 应该明确需要优化什么。然后针对性优化。

## 网络

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

### 虚拟列表、滚动

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

压缩图片，使用 webP 格式(比 jpeg 小 30%)，懒加载图片
sprite 图

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
| 首屏加载时间 | 路由懒加载，service work（比较难，有兼容性） > 代码分割 > 异步组件，懒加载图片 >           |     |     |
| 加载速度     | 代码分割 > Gzip / Brotli，sprite，压缩文件，cdn > 浏览器缓存，service workers> 异步加载组件、js 依赖 > 预加载 > 使用 http2 协议 |     |     |
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
