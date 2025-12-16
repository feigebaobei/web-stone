# performance

## 网络

http2 多路复用
头部压缩

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

### 减少重排

- 改变 font-size 和 font-family
- 改变元素的内外边距
- 通过 js 改变 css 类
- 通过 js 获取 dom 元素的位置相关属性（如 width/height/left）
- css 伪类激活
- 滚动滚动条或者改变窗口大小。
- 使用 Flex 时，比使用 inline-block 和 float 时重排更快
- 硬件加速 style.left transtorm: translate
- 不要使用 @ import

### 图片

- 渐进式图片。先使用压缩图，再使用高清图。
- 响应式图片

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

- 压缩图片
  tinypng 免费、批量、速度块
  智图压缩 百度很难搜到官网了，免费、批量、好用
  squoosh 在线图片压缩工具
  compressor 支持 JPG、PNG、SVG、GIF

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
