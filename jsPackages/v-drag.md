# v-drag

## overview

> 支持 vue/vue2/vue3 的可拖拽的指令。

### feature

- feature0
- feature1
- feature2

## install

`npm i v-drag`

## usage

```js
import drag from 'v-drag'
Vue.use(drag, {
    ... // 全局配置对象
})
<div v-drag>str</div>
```

## configuration

<!-- prettier-ignore-start -->
|全局配置对象的属性|子属性|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|-|
|eventClass||设置默认样式类|||||||
||initial||string|'drag-draggable'|||||
||hasHandle||string|'drag-uses-handle'|||||
||handle||string|'drag-handle'|||||
||down||string|'drag-down'|||||
||move||string|'drag-move'|||||
|removeTransitoin||是否排除所有transition动画，尽可能保持拖动流畅。|boolean|false|||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|options key|description|type|default|enum|demo|shortcut||
|-|-|-|-|-|-|-|-|
|axis|是否只能在轴方向移动||'all'|'all'/'x'/'y'||`v-drag:x`||
|snap|指定间隙有多大|`number/string/number[]/string[]`|||`{snap: 100}` `{snap: [10, 50]}`|||
|handle|可搬动的区域，css选择器/ref。|string||`{handle: '.xx'}` `v-drag={handlerRef}`|||
<!-- prettier-ignore-end -->

## 事件

| event                 | description      |     |     |
| --------------------- | ---------------- | --- | --- |
| @v-drag-setup         | 完成 setup 时    |     |     |
| @v-drag-start         | 按下鼠标时       |     |     |
| @v-drag-moving        | 正在移动时       |     |     |
| @v-drag-end           | 抬起鼠标时       |     |     |
| @v-drag-update        | 改变配置时       |     |     |
| @v-drag-axis-update   | 当轴改变时       |     |     |
| @v-drag-handle-update | 当 handle 改变时 |     |     |

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
