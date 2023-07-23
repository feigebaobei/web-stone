# vue3 的高阶组件

## overview

> TODO: description

### feature

- feature0
- feature1
- feature2

### vue2Hoc &vue3Hoc & reactHoc

|          | vue2Hoc | vue3Hoc                       | reactHoc   |     |
| -------- | ------- | ----------------------------- | ---------- | --- |
|          |         |                               |            |     |
| 如何实现 |         | 处理 props/method/event/slots | 传递 props |     |

## demo

```js
function hoc (SubComp) {
    return {
        mounted() {
            clog('...')
        },
        props: SubComp.props,
        render(h) {
            let children = ...
            return h(SubComp, {
                on: this.$listeners,
                props: this.$props,
                atts: this.$attrs,
            }, children)
        }
    }
}
export default hoc
```

## 知识基座

|              |                      |     |     |
| ------------ | -------------------- | --- | --- |
| `$props`     | 在组件上声明的 props |     |     |
| `$attrs`     | 组件上未声明的 props |     |     |
| `$listeners` | 组件上声明的事件     |     |     |
| `$refs`      |                      |     |     |
| `$slots`     |                      |     |     |

## usage

同`./demo.md`

```js
const {{packageName}} = require('{{packageName}}');
// or
// import {{packageName}} from '{{packageName}}';
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

`{{packageName}}.fn(param, first: string, second: boolean = true) => void`
description

`{{packageName}}.fn(param, [options: {a: string, b?: number}])`
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
