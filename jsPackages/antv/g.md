# g

## overview

> antv 家族的低层库

### feature

- feature0
- feature1
- feature2

## install

`npm i g`

## usage

```js
import { Circle, Text, Line } from '@antv/g'
import { Renderer } from '@antv/g-canvas'
import interact from 'interactjs'

const renderer = new Renderer()
// 节点1
const node1 = new Circle({
  style: {
    r: 100, // 半径
    fill: '#1890FF', // 填充色
    stroke: '#F04864', // 描边颜色
    lineWidth: 4, // 描边宽度
    cursor: 'pointer',
  },
})
const text1 = new Text({
  style: {
    text: 'Node1', // 文本内容
    fontFamily: 'Avenir', // 字体
    fontSize: 22, // 字号
    fill: '#fff', // 文本颜色
    textAlign: 'center', // 水平居中
    textBaseline: 'middle', // 垂直居中
  },
})
node1.appendChild(text1) // 设置node的子节点text1
node1.setPosition(200, 200) // node的位置改变时其子节点也会改变。
const edge = new Line({
  style: {
    x1: 200,
    y1: 200,
    x2: 400,
    y2: 200,
    stroke: '#1890FF',
    lineWidth: 2,
  },
})
const canvas = new Canvas({
  container: 'container', // DOM 节点id
  width: 600, // 画布宽度
  height: 500, // 画布高度
  renderer,
})
canvas.addEventListener(CanvasEvent.READY, () => {
  canvas.appendChild(edge)
  canvas.appendChild(node1)
  canvas.appendChild(node2)
})
// 或者
// await canvas.ready;
// canvas.appendChild(node1);
// canvas.appendChild(node2);
// canvas.appendChild(edge);
node1.addEventListener('mouseenter', () => {
  // 修改图形样式属性
  node1.style.fill = 'red'
})
node1.addEventListener('mouseleave', () => {
  // 修改图形样式属性
  node1.style.fill = '#1890FF'
})
// 拖拽事件
// 使用 interact.js 实现拖拽
interact(node1, {
  // 直接传入节点1
  context: canvas.document, // 传入上下文
}).draggable({
  onmove: function (event) {
    // interact.js 告诉我们的偏移量
    const { dx, dy } = event
    // 改变节点1位置
    node1.translateLocal(dx, dy)
    // 获取节点1位置
    const [nx, ny] = node1.getLocalPosition()
    // 改变边的端点位置
    edge.style.x1 = nx
    edge.style.y1 = ny
  },
})
```

## title

### 场景图

是一个有向无环图。用于组织和管理二维/三维虚拟场景的一种数据结构。

- 描述父子关系
- 自动完成基于父子关系的某些复杂级联计算
  场景图是一种抽象的数据结构，只有在渲染时才需要与 Canvas 交互。

#### 平移

平移
对于平移操作，我们提供了局部/世界坐标系下，移动绝对/相对距离的 API：

名称 参数 返回值 备注
translate [number, number] 无 在 世界坐标系 下，相对当前位置移动
translateLocal [number, number] 无 在 局部坐标系 下，相对当前位置移动
setPosition [number, number] 无 设置 世界坐标系 下的位置
setLocalPosition [number, number] 无 设置 局部坐标系 下的位置
getPosition 无 [number, number] 获取 世界坐标系 下的位置
getLocalPosition 无 [number, number] 获取 局部坐标系 下的位置

### 相机

整个画布中的图形都需要重绘。具体到内部实现，每个图形在世界坐标系下的变换矩阵都需要重新计算。把矩阵计算过程放在 Shader 中交给 GPU 完成能带来明显的性能提升，显然只有配合 g-webgl 才能发挥效果。而如果只改变相机矩阵，将极大程度减少 CPU 的运算量

### 动画

可以把 g 元素当作 dom 元素。即使用 animate 实现动画。

## 渲染器

场景图描述待渲染对象后，我们需要将它们交给渲染器。使用何种渲染器由用户按需引入，并且可以在运行时切换。

```js
import { Renderer as CanvasRenderer } from '@antv/g-canvas'
import { Renderer as WebGLRenderer } from '@antv/g-webgl'
import { Canvas } from '@antv/g'
const canvas = new Canvas({
  container: 'container',
  width: 600,
  height: 500,
  // renderer: new CanvasRenderer(),
  renderer: new WebGLRenderer(),
})
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|参数|子参数|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|-|
|||||||||||
|||||||||||
|||||||||||
<!-- prettier-ignore-end -->

`g.fn(param, first: string, second: boolean = true) => void`
description

`g.fn(param, [options: {a: string, b?: number}])`
description

## 插件

- [g-plugin-3d 3d 图形]()
- [title]()
- [title]()
- [title]()

## principle

大部分基于 g-lite 包开发的。

### uml

```

```

## todo

> 我对数据结构感兴趣。
> 使用什么样的数据结构对实现元素建立模型。
> 欧拉角  是由 18 世纪的瑞士数学家莱昂哈德·欧拉提出的，用来描述刚体在三维空间中的取向。欧拉角是一组用来表示刚体坐标系和参考系之间夹角的三个独立角参量，通常由章动角、旋进角（即进动角）和自转角组成。
> 可插件机制。
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
