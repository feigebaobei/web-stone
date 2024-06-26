# vue2&vue3

<!-- prettier-ignore-start -->
| | vue1  | vue2  | vue3 |
| -- | -- | - | ------- |
| 响应式    | | 对象：使用`defineProperty`劫持对象的已有属性的读取、修改操作  | 使用 proxy 拦截、使用 reflect 操作原始对象。 |
|  | 数组：劫持操作数据的 7 种方法：`push/pop/unshift/shift/splice/sort/reverse`   |   |   |
|  | 缺点：无法劫持新添加的属性、删除已有的属性。使用数组下标直接改变数组不会触发更新。需要使用`Vue.set(obj. key, value)`实现响应式。 |   |   |
| tres-shaking | | 不支持。   | 支持。   |
| diff   | | 全量遍历和对比 | 叫 patch |
|  | |   | 以 v-if/v-for 为边界，将模板分成多个块。每个块中的结构是固定的。块只不需要进行遍历树，只需要比对绑定的值。 |
|  | |   | 将静态节点、子树等渲染代码移到渲染函数外。这样可以减少渲染工作量    |
|  | |   | 动态数据节点标记（patchFlag）节点类型。调用节点类型比较方法。 |
|  | |   | 缓存监听函数。   |
|  | |   | 细分元素的更新类型。只比对需要变动的内容，只更新变动的内容。  |
| 模板编译  | | compile 把模板（\*.vue）转化为 render 方法。render 方法返回 vdom |   |
|  | |   |   |
|  | |   |   |
<!-- prettier-ignore-end -->

## diff

### vue2 diff

- 如果新节点有子节点而老节点没有子节点，则判断老节点是否有文本内容，如果有就清空老节点的文本内容，然后为其新增子节点。
- 如果新节点没有子节点而老节点有子节点，则先删除老节点的子节点，然后设置文本内容。
- 如果新节点没有子节点，老节点也没有子节点，则进行文本的比对，然后设置文本内容。
- 如果新节点有子节点，老节点也有子节点，则进行新老子节点的比对，然后进行新增、移动、删除的操作。

![vue2Diff](/framework/vue3/vue2Diff.png)

### vue3 patch

## 编译模板

### vue2 编译模板

```

*.vue ----> ast ----> render() ----> vdom ----> 视图
```

![vue2Compile](/framework/vue3/vue2Compile.png)

### vue3 编译模板

1. 调用 baseParse()，解析模板，返回 ast.
2. 调用 transform()，转换 ast.
3. 调用 generate()，根据 ast 生成 render 方法并返回。

![vue3Compile](/framework/vue3/vue3Compile.png)

## vue2 & vue3 组件模板

```js
// vue2
// 它都过时了，不再整理它了。
```

```js
// vue3
<template>
    // ...
</template>
<script>
import {
    provide,
    inject
} from 'vue'
export default {
    props: {},
    setup(props, context) {},
    computed: {},
    methods: {},
}
</script>
<style>
</style>
```
