# vue2

## overview

> TODO: description

### feature

- feature0
- feature1
- feature2

## install

一般不需要安装。它有自己的脚手架。创建项目时一个命令就安装了全部依赖。
`npm i vue`

## usage

```js
const vue = require('vue')
// or
// import vue from 'vue';
// TODO: DEMONSTRATE API
```

### [component](/framework/vue2/component.html)

### [watch](/framework/vue2/watch.html)

### [computed](/framework/vue2/computed.html)

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

`vue.fn(param, first: string, second: boolean = true) => void`
description

`vue.fn(param, [options: {a: string, b?: number}])`
description

## principle

vue2 中采用 defineProperty 来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加 getter 和 setter，实现响应式

```
// 简化的响应式实现
function defineReactive(obj, key, val) {
  // 递归处理子对象
  observe(val);

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 依赖收集
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      // 触发更新
      val = newVal;
      // 通知视图更新
    }
  });
}
```

### 重写数组的 push/shift/unshift/pop/splice/sort/reverse 等方法

```js
methodsToPatch.forEach(function (method) {
  // 缓存原始方法
  const original = arrayProto[method]

  // 定义新的方法
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      // 先调用原生方法获取结果
      const result = original.apply(this, args)
      const ob = this.__ob__

      // 对新增的元素进行响应式处理
      let inserted
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }

      // 如果有新增元素，则对它们也进行观测
      if (inserted) ob.observeArray(inserted)

      // 通知依赖更新
      ob.dep.notify()

      return result
    },
    enumerable: false,
    writable: true,
    configurable: true,
  })
})
```

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
