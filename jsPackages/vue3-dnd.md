# vue3-dnd

## overview

> 基于 react-dnd 的核心程序开发的。  
> 一般需要与 react-dnd-html5-backend 一起使用

### feature

- feature0
- feature1
- feature2

### 概念

|          |              |                                            |     |     |
| -------- | ------------ | ------------------------------------------ | --- | --- |
| 项目     | items        | 拖动的是项目（数据）                       |     |     |
| 类型     | types        | 项目的类型                                 |     |     |
| 监视器   | monitors     | 监视拖动过程中的状态                       |     |     |
| 连接器   | connectors   | 把 dom 元素与 backend 中预定义角色建立连接 |     |     |
| 拖拽源   | drag sources |                                            |     |     |
| 拖放目标 | drop targets |                                            |     |     |
|          |              |                                            |     |     |
|          |              |                                            |     |     |
|          |              |                                            |     |     |

## install

`npm i vue3-dnd`

## usage

同`./demo.md`

```js
const vue3-dnd = require('vue3-dnd');
// or
// import vue3-dnd from 'vue3-dnd';
// TODO: DEMONSTRATE API
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

`vue3-dnd.fn(param, first: string, second: boolean = true) => void`
description

`vue3-dnd.fn(param, [options: {a: string, b?: number}])`
description

### DragSourceMonitor

它是传递给 DragSource 的对象。它提供了若干获取拖动源信息的方法。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|`canDrag: () => boolean`||||||||
|`isDragging: () => boolean`||||||||
|`getItemType: () => string | null`|返回当前拖动项的类型type.|||||||
|`getItem: () => object | null`|当前拖动项对应的普通对象（它是数据）。每个拖动源使用其item属性来设置它。|||||||
|`getDropResult: () => object | null`|返回放置对象对应的普通对象（它是数据）。只能在end()内部设置，否则返回null|||||||
|`didDrop: () => boolean`|某个拖放目标是否已经处于拖放事件|||||||
|`getInitialClientOffset: () => {x: number, y: number} | null`|返回拖动开始时鼠标的位置|||||||
|`getInitialSourceClientOffset: () => {x: N, y: N} | null`|返回当前拖动开始时，拖动源的相对于客户端的初始位置|||||||
|`getClientOffset: () => {x:N, y: N}`|返回拖动起点相对于客户端的偏移量|||||||
|`getDifferenceFromInitialOffset: () => {x:N, y:N}`|返回当前拖动中鼠标指针相对于开始拖动时的鼠标指针位置的偏移量|||||||
|`getSourceClientOffset: () => {x:N, y:N}`|返回当前拖动源的根DOM节点相对于客户端的偏移量|||||||
<!-- prettier-ignore-end -->

### specification

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|required||
|-|-|-|-|-|-|-|-|
|`type: string | symbol`|拖拽元素的类型|||||y||
|`item: object | () => object`|是一个描述被拖动数据的纯 JavaScript 对象。|||||y||
|`collect: (monitor: DragSourceMonitor) => CollectedProps`|一个收集器的函数。它应该返回一个普通对象并成为useDrag返回值中的第一个项。|||||n||
|`previewOptions: DragPreviewOptions`||||||n||
|`options: DragSourceOptions`|一个普通对象，可选地包含以下任何属性：dropEffect: 非必填，在此拖动中使用的拖放效果类型。可选值：'move' / 'copy'|||||n||
|`end: (draggedItem: object, monitor: DragSourceMonitor) => void`|当拖动停止时，end函数会被调用。|||||n||
|`canDrag: boolean | (monitor: DragSourceMonitor) => boolean`||||||n||
|`isDragging: boolean | (monitor: DragSourceMonitor) => boolean`||||||n||
<!-- prettier-ignore-end -->

### useDrag

可以使用组件成为拖拽源，接入 DnD 方法。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|`useDrag: (params: Specification | () => Specification) => [CollectedProps, dragSource, dragPreview]`|CollectedProps是ref对象，是collect函数的返回值|||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

### useDrop

可以使用组件成为放置目标，接入 DnD 方法。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|`useDrop: (params: Specification | () => Specification) => [CollectedProps, DragTarget]`||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

### Specification

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|required||
|-|-|-|-|-|-|-|-|
|`accept: string | symbol | string[] | symbol[]`||||||y||
|`accept: (monitor: DropTargetMonitor) => CollectedProps`|一个收集器的函数。它应该返回一个普通对象并成为useDrop返回值中的第一个项。|||||n||
|`options: object`|目前没什么用。|||||n||
|`drop: (item: object, monitor: DropTargetMonitor) => (void | Record<string, any>)`|当拖拽元素放置在目标上时调用。|||||n||
|`hover: (item: object, monitor: DropTargetMonitor) => void`|当拖拽组件经过组件上时调用该方法。|||||n||
<!-- prettier-ignore-end -->

### useDragLayer

提供了一种将你的组件作为拖动层连接到 DnD 的方法。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|`useDragLayer: (params: (monitor: DragLayerMonitor) => (void | object)) => ref`||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

### DropTargetMonitor

DropTargetMonitor 是传递给 DropTarget 放置目标的对象。它提供了一些方法，让你可以获取到有关放置目标的一些状态信息。绑定到该监视器的特定放置目标在下面称为监视器的所有者。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|`canDrop: () => xx`||||||||
|`isOver: (options?: { shallow: boolean }) => boolean`||||||||
|`getItemType: () => string | null`||||||||
|`getItem: () => object | null`||||||||
|`getDropResult: () => object | null`||||||||
|`didDrop: () => boolean`||||||||
|`getInitialClientOffset: () => { x: number, y: number }`||||||||
|`getInitialSourceClientOffset: () => { x: number, y: number }`||||||||
|`getClientOffset: () => { x: number, y: number }`||||||||
|`getDifferenceFromInitialOffset: () => { x: number, y: number }`||||||||
|`getSourceClientOffset: () => { x: number, y: number }`||||||||
<!-- prettier-ignore-end -->

### DragLayerMoniter

DragLayerMonitor 是传递给 DragLayer 拖动层 collect 收集函数的对象。它提供了一些方法，让你可以获取到全局拖放状态信息。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|`isDragging: () => boolean`||||||||
|`getItemType: () => (string | null)`||||||||
|`getItem: () => (object | null)`||||||||
|`getInitialClientOffset: () => { x: number, y: number }`||||||||
|`getInitialSourceClientOffset: () => { x: number, y: number }`||||||||
|`getClientOffset: () => { x: number, y: number }`||||||||
|`getDifferenceFromInitialOffset: () => { x: number, y: number }`||||||||
|`getSourceClientOffset: () => { x: number, y: number }`||||||||
<!-- prettier-ignore-end -->

### title

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
