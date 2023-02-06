# slot

- 为子组件的特定占位符设置内容
- 它不是 vue 的“专利”，html 中有`slot`标签
- 使用 name 属性设置具名插槽。无 name，则为默认插槽。
- 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
- 用法
  - `v-slot` / `#`
  - v-slot 是一个指令。只能与`<template>`或组件一起使用。
  - 简写为`#`。简写时不能省略参数。
- 作用域插槽
  - 在父组件中可以使用子组件的数据。

## 默认内容

`slot`之间的内容是默认内容。

## 具名插槽

```html
<!-- 定义 -->
<div>
  <slot name="first"></slot>
</div>

<!-- 使用 -->
<template v-slot:first>...</template>
```

## 动态插槽名

```html
<div>
  <template v-slot:[dynamicSlotName]></template>
  <template #[dynamicSlotName]></template>
</div>
```

## 作用域插槽

```html
<MyComp #first="obj"> {{obj.key}} {{obj.value}} </MyComp>
```
