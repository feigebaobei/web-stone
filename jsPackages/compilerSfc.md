# `@vue/compiler-sfc`

## overview

> 编译 sfc 的包。会输出 es 模块。因此可以使用`import`引入并使用。

### feature

- feature0
- feature1
- feature2

## install

`npm i @vue/compiler-sfc`

## usage

同`./demo.md`

```
const @vue/compiler-sfc = require('@vue/compiler-sfc');
// or
// import @vue/compiler-sfc from '@vue/compiler-sfc';
// TODO: DEMONSTRATE API
```

## vue3 版本 sfc 模板

```vue
<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<script>
export default {
  data() {
    return {
      greeting: 'Hello World!',
    }
  },
}
</script>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

## configuration

默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api

`@vue/compiler-sfc.fn(param, first: string, second: boolean = true) => void`
description

`@vue/compiler-sfc.fn(param, [options: {a: string, b?: number}])`
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
