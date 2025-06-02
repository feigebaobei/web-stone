# dom 的坐标

![pic](https://images.cnblogs.com/cnblogs_com/yoyiorlee/DOM.gif)

|              |         |                      |     |
| ------------ | ------- | -------------------- | --- |
| clientTop    |         |                      |     |
| style        | top     |                      |     |
|              | width   |                      |     |
|              | height  |                      |     |
|              | margin  |                      |     |
|              | padding |                      |     |
|              | border  |                      |     |
| scrollHeight |         | 滚动高度             |     |
| scrollLeft   |         | 滚动高度             |     |
| scrollTop    |         | 滚动高度             |     |
| scrollWidth  |         | 滚动宽度             |     |
| offsetTop    |         | 该元素到父元素的距离 |     |
| clie         |         |                      |     |
| clientTop    |         |                      |     |
| clientTop    |         |                      |     |

```js
// 得到dom元素的坐标
let rect = dom.getBoundingClientRect()
rect: {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}
```

# event 的坐标

|         | 原点               |     |     |     |
| ------- | ------------------ | --- | --- | --- |
| clientX | 窗口左上角         |     |     |     |
| clientY | 窗口左上角         |     |     |     |
| pageX   | 页面左上角         |     |     |     |
| pageY   | 页面左上角         |     |     |     |
| screenX |                    |     |     |     |
| screenY |                    |     |     |     |
| offsetX | 事件元素的的左上角 |     |     |     |
| offsetY | 事件元素的的左上角 |     |     |     |
