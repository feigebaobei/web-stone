# intersectionObserver

- 用于异步检测目标元素与祖先元素（或视口）（下文称为根，或根元素。）相交情况。
- 反对使用`Element.getBoundingClientRect()`处理与视口的位置关系后再做若干回调。
- 当从任意方向越过阈值时，运行回调函数。
- 异步监听目标元素与祖先元素的相交面积改变。

## demo

```js
// demo1
// 1. 定义一个观察器
// 2. 去观察一个目标元素
let cb = (entries, observer) => {
  // 若需要执行任何耗时的操作，请使用 Window.requestIdleCallback()。
}
let options = {
  root: null,
  rootMargin: 0,
  threshold: 0.7,
}
let observer = new IntersetionObserver(cb, options)
observer.observe(document.querySelector('#id')) // 若指定的root,则目标必须是根元素的后代。

// demo2
const numSteps = 20.0
let boxElement
let prevRatio = 0.0
let increasingColor = 'rgba(40, 40, 190, ratio)'
let decreasingColor = 'rgba(190, 40, 40, ratio)'
window.addEventListener(
  'load',
  (event) => {
    boxElement = document.querySelector('#box')
    createObserver()
  },
  false
)
function createObserver() {
  let observer
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList(),
  }
  observer = new IntersectionObserver(handleIntersect, options)
  observer.observe(boxElement)
}
function buildThresholdList() {
  let thresholds = []
  let numSteps = 20
  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps
    thresholds.push(ratio)
  }
  thresholds.push(0)
  return thresholds
}
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor.replace(
        'ratio',
        entry.intersectionRatio
      )
    } else {
      entry.target.style.backgroundColor = decreasingColor.replace(
        'ratio',
        entry.intersectionRatio
      )
    }
    prevRatio = entry.intersectionRatio
  })
}
```

cb 会在主线程中执行，所以该函数要尽可能快。若需要执行耗时操作，请使用[Window.requestIdelCallback](/language/javascript/requestIdleCallback.html)

## api

<!-- prettier-ignore-start -->
|||default|description|
|-|-|-|-|
|IntersectionObserver(cb: ( entry: IntersectionObserverEntry, observer) =>  void, options)|||别的方法都是先写options再写cb|
|options||||
||root|null。默认为浏览器视口。||
||rootMargin|0 0 0 0|用于增大或缩水根元素边框的每一侧，然后计算交叉点。|
||threshold|`number | number[]`默认为0|当达到指定百分比时触发回调|
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
|observer||||
|-|-|-|-|
|属性||||
|||||
|方法||||
||disconnect()|终止对所有目标元素可见性变化的观察||
||observe(target)|异步观察指定target与root的相交关系。|可以在一个观察器上添加多个目标元素。|
||takeRecords()|返回IntersectionObserverEntry对象||
||unobserve(target)|终止对指定元素的观察||
<!-- prettier-ignore-end -->

## 计算交集

按可见部分的占据的最小矩形。

# IntersectionObserverEntry

用于 IntersectionObserver 的回调方法中。
只能通过调用 IntersectionObserver.takeRecords()获取。

## api

<!-- prettier-ignore-start -->
||||||||||
|-|-|-|-|-|-|-|-|-|
|属性|||||||||
||boundingClientRect|目标边界信息。与`Element.getBoundingClientRect()`相同|||||||
||intersectionRatio|intersectionRect / boundingClientRect的比值|||||||
||intersectionRect|返回一个domrectreadonly对象，用来描述根与目标元素的相交区域的矩形。|||||||
||isIntersecting|是否交叉|||||||
||rootBounds|返回观察者的根|||||||
||target|返回target|||||||
||time|返回从IntersectionObserver的时间 原点到交叉被触发的时间|||||||
|方法|没有方法||||||||
||||||||||
<!-- prettier-ignore-end -->

# DOMRectReadOnly

详细列出 DOMRect 所使用的标准属性来定义一个属性不可变的矩形。

## api

<!-- prettier-ignore-start -->
||||||||||
|-|-|-|-|-|-|-|-|-|
|构造函数|DOMRectReadOnly()|不能由第三方js调用|||||||
|属性|||||||||
||x|domrect原点的x坐标|||||||
||y|domrect原点的x坐标|||||||
||width||||||||
||height||||||||
||top||||||||
||right||||||||
||bottom||||||||
||left||||||||
|方法|||||||||
|静态方法|||||||||
||DOMRectReadOnly.fromRect()||||||||
<!-- prettier-ignore-end -->
