# vue3 的高阶组件

## overview

> vue 的 hoc 是一个方法。参数是组件，返回值是 vnode.使用方法如下文。

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

引示例中 hoc 的功能：

- 在 hoc 中设置若干基本 dom.
- 把 hoc 组件上的 props 全部给其子组件。
- 暴露子组件支持的事件。透传事件。
- 把 hoc 收到的插槽全给子组件。（由子组件使用可以使用的）
- 为 hoc 的子组件绑定 ref 值，这样可以在 hoc 中调用子组件的 method。

```js
// hoc.ts
import {
  defineComponent,
  h,
  ref,
  // getCurrentInstance,
  onMounted,
} from 'vue'
import type { ComponentInternalInstance } from 'vue'

let clog = console.log
let scR = ref() // 它必须在defineComponent外面。
let hoc = (SubComp) => {
  return defineComponent({
    props: SubComp.props,
    emits: SubComp.emits,
    setup(props, ctx) {
      onMounted(() => {
        scR.value.fn()
      })
      clog('props', props)
      clog('ctx', ctx)
      clog('SubComp', SubComp)
      let b = ref('strb')
      let opProps = () => {
        let t = Object.entries(SubComp.props) // [[k, v]]
          .reduce((r, [k]) => {
            r[k] = props[k]
            return r
          }, {})
        return t
      }
      let opEvent = (self) => {
        let t = {}
        ;(SubComp.emits || []).forEach((eventName) => {
          let onEventName = `on${eventName
            .slice(0, 1)
            .toUpperCase()}${eventName.slice(1)}`
          t[onEventName] = (...rest) => {
            self.$emit(eventName, ...rest)
          }
        }, self)
        return t
      }
      let opSlot = (self) => {
        let t = Object.entries(self.$slots).reduce((r, [k, v]) => {
          r[k] = v
          return r
        }, {})
        return t
      }
      return {
        k: 'v',
        a: 'b',
        b,
        opProps,
        opEvent,
        opSlot,
      }
    },
    // h写法
    render(self: ComponentInternalInstance) {
      clog('self', self)
      return h('div', [
        'render',
        this.b,
        h(
          SubComp,
          {
            ...this.opProps(),
            ...this.opEvent(this),
            ref: scR,
          },
          this.opSlot(this)
        ),
      ])
    },
  })
}

export default hoc
```

```js
<template>
    {/* 设置属性、绑定事件 */}
    <wrap-comp :msg="'msg str1'" @baseClick="eventNameH">
        from app hi
        {/* 具名插槽 * 2 */}
        <template #footer>footer string</template>
        <template #header>header string</template>
        {/* 作用域插槽 */}
        <template #body="obj">
            <p>{{ obj }}</p>
            <p>{{ obj.text }}</p>
        </template>
    </wrap-comp>
</template>
<script lang="ts">
import Base from './Base.vue'
import hoc from './hoc'
let WrapComp = hoc(Base)
export default defineComponent({
    components: {
        WrapComp
    },
    setup() {
        let eventNameH = () => {}
        return {
            eventNameH
        }
    }
})
</script>
```

## 知识基座

|              |                      |                                            |     |
| ------------ | -------------------- | ------------------------------------------ | --- |
| `$props`     | 在组件上声明的 props |                                            |     |
| `$attrs`     | 组件上未声明的 props |                                            |     |
| `$listeners` | 组件上声明的事件     | vue3 不再支持了。它被合并到了`this.$attrs` |     |
| `$refs`      |                      |                                            |     |
| `$slots`     |                      |                                            |     |

## usage

同`./demo.md`

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

## 后记

vue3 组件库的每个组件的 api 分 4 种，如下：
|||||
|-|-|-|-|
|props|接收属性|||
|event|绑定事件回调方法|||
|method|暴露的方法|这点很多作者忽略了。这么强大的功能，不用多可惜呀。||
|slots|插槽|||
因 no.3 常被忽略，所以在做 hoc 时也习惯性忽略了。近些天看了网友的文章都是只做到 1、2、4。我觉得少了 method 是不完美的。所以在写 hoc 时把它补齐了。
不可能完成一个万能的 hoc。需要在具体需求中开发具体的 hoc。

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
