# vuedraggable

## overview

> 支持 vue1/vue2 的拖动、排序组件。
> 基于 sortable.js

### feature

- 兼容 vue2 / transition-group
- 支持取消
- feature2

## install

`npm i vuedraggable`

## usage

```html
<draggable v-model="myArr" group="people" @start="drag=true" @end="drag=false">
  <div v-for="(item) in myArr" :key="item.id">str</div>
</draggable>
<draggable v-model="myArr">
  <transition-group>
    <div v-for="..."></div>
  </transition-group>
</draggable>

import draggable from 'vuedraggable' exprot default { components: { draggable }
}
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
|value||||||||
|list||||||||
|所有sortable的选项||||||||
|tag||||||||
|clone||||||||
|move||||||||
|componentData||||||||
<!-- prettier-ignore-end -->

| 事件     |     |     |     |
| -------- | --- | --- | --- |
| start    |     |     |     |
| add      |     |     |     |
| remove   |     |     |     |
| update   |     |     |     |
| end      |     |     |     |
| choose   |     |     |     |
| unchoose |     |     |     |
| sort     |     |     |     |
| filter   |     |     |     |
| clone    |     |     |     |

| slots   |     |     |     |
| ------- | --- | --- | --- |
| header  |     |     |     |
| footer  |     |     |     |
| gotchas |     |     |     |

`vuedraggable.fn(param, first: string, second: boolean = true) => void`
description

`vuedraggable.fn(param, [options: {a: string, b?: number}])`
description

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
