# vue3 项目中 class 不生效

由`v-if`&`class`

## 原因

vue 渲染组件时会为其他设置一个 hash 值为属性（如：`data-v-3e879a65`）。
class 生效的类名为`.class_name[data-v-3e879a65] {...}`。意为有`data-v-3e879a65`属性的`class_name`类的样式为`...`  
当 v-if 值为真时，渲染出的元素有 hash 值。样式无 hash 属性。所以样式不会生效。

## 解决方案

- 把有 v-if 指令的 dom 元素上的 v-if 指令向外提一层。

```
<div v-if="b">
    <div class="k">
        ...
    </div>
</div>
```

- 使用 style 代替 class
- `<style>`标签中删除 scoped 属性。缺点是污染全局样式。
- `v-if`改为`v-show`
