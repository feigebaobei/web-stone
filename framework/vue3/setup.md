# setup

> setup() 它是一个钩子、生命周期方法。在\*.vue 文件中使用。
> 官网推荐写法`<script setup>`

## 非语法糖

```
<template>....</template>
<script>
import {ref, mounted,} from 'vue'
export default {
    props: {
        title: String,
    },
    setup(
        props,
        context, // {attrs, slots, emit, expose}
    ) { // 这里的this是undefined.
        expose({k: 'v'}) // 暴露一个可以被其他组件访问的数据。
        return { // 返回一个对象。可以用于template
            count: ref(0)
        }
        return () => h('div', null, 'str') // 返回了渲染函数。可以代替template标签。
    },
    mounted() {
        ...
    },
}
</script>
```

## 语法糖

```

```
